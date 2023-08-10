import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { PrismaService } from './prisma.service';
import { link, Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config'
import { TelemetryService } from './telemetry/telemetry.service';
import { RedisUtils } from './utils/redis.utils';
import { Link } from './app.interface';

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    private readonly redisService: RedisService,
    private prisma: PrismaService,
    private telemetryService: TelemetryService,
    private redisUtils: RedisUtils,
    ) {}


    /**
     * Updates the click count in the postgres db based on hashId or customhashid
     * @param hashID 
     */
    async updateClicksInPostgresDB(id: string|number): Promise<void> {
   
    // Check if given id is customhashid  
    Number.isNaN(parseInt(id.toString())) ? id = await this.redisUtils.fetchKey(id.toString()):0;

    const link = await this.prisma.link.findFirst({
      where: { hashid: parseInt(id.toString())},
    })

    let cnt = await this.prisma.link.update({
           where: { id: link.id },
           data: { clicks: link.clicks + 1 }
       });
    }

    // TO DO: shift to DB utils, required in scheduler !! so take care of that before shifting it to any other files
    async updateClicksInDb(): Promise<void> {
    const client = await this.redisService.getClient(this.configService.get<string>('REDIS_NAME'));
    const keys: string[] = await this.redisUtils.fetchAllKeys()
    for(const key of keys) {
      client.get(key).then(async (value: string) => {
        const updateClick = await this.prisma.link.updateMany({
          where: {
            OR: [
              {
                hashid: Number.isNaN(Number(key)) ? -1 : parseInt(key),
              },
              {
                customHashId: key,
              },
            ],
          },
          data: {
            clicks: parseInt(value),
          },
        });
      });
    }
    }

    // TO DO: shift to db utils
    async link(linkWhereUniqueInput: Prisma.linkWhereUniqueInput,
    ): Promise<link | null> {
      return this.prisma.link.findUnique({
        where: linkWhereUniqueInput,
      });
    }

    // TO DO: shift to db utils
    async links(params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.linkWhereUniqueInput;
      where?: Prisma.linkWhereInput;
      orderBy?: Prisma.linkOrderByWithRelationInput;
    }): Promise<link[]> {
      const { skip, take, cursor, where, orderBy } = params;
      return this.prisma.link.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    }

    /**
     * #### Persist the links in DB as well as cache to Redis after due validation.
     * A valid customHashId should not be a number and shouldn't have any special characters other than hyphen and underscore.
     * - Example of a valid customHashId: "my-custom-hash-id", "hasd1212"
     * - Example of an invalid customHashId: "123", "my-custom-hash-id!"
     * 
     * @param data - The link data to be persisted.
     * @returns The link object that has been persisted.
     */
    async createLinkInDB(data: Prisma.linkCreateInput): Promise<link> {
      const validCustomHashIdRegex = /^(?!^[0-9]+$)[a-zA-Z0-9_-]+$/;
      // validate the incoming request for custom hashId
      if (data.customHashId != undefined && !validCustomHashIdRegex.test(data.customHashId)) {
        return Promise.reject(new Error('Invalid custom hashId. Only alphanumeric characters, hyphens and underscores are allowed.'));
      }
    
      try {
        
        // create the link in DB
        const link = await this.prisma.link.create({
          data:{
            ...data,
          },
        });
        // set the link in redis
        this.redisUtils.setKey(link);
        return link;

      } catch (error) {
        throw new Error('Failed to create link in the database.');
      }
    }

    /**
     * updates the link in DB as well as cache to Redis after due validation.
     * @param params 
     * @returns 
     */
    async updateLink( id:string|number , data:link ): Promise<link> {

      return this.prisma.link.findFirst({
        where: {
        OR: [ 
          { hashid: Number.isNaN(Number(id)) ? -1 : parseInt(id.toString()) }, 
          { customHashId: id.toString() } 
        ],
        },
      })
      .then((link) => {
        if(link == null){
          return Promise.reject(new Error('Link not found.'));
        }
        this.redisUtils.clearKey(link); // to clear the old key from redis

        if(!data.tags) data.tags = link.tags
        if(!data.customHashId ) data.customHashId = link.customHashId
        // if(!data.hashid) data.hashid = link.hashid   // cannot change hashid
        if(data.params){
          // update the params 
          const values = Object.keys(data.params);
          if(link.params == null) link.params = {};
          values.forEach((value) => {
            console.log(value,data.params[value]);
            link.params[value] = data.params[value];
          });

          if(link.params)data.params = link.params;
        }
        if(data.url != link.url) data.clicks = 0;
        else data.clicks = link.clicks;

        return this.prisma.link.update({
          where : { id: link.id },
          data:data
        });

      })
      .then((link) => {
        this.redisUtils.setKey(link); // to set the new key in redis
        return link;
      });
    }

    /**
     * deletes the link in DB as well as cache to Redis after due validation.
     * @param where 
     * @returns 
     */
    async deleteLink(where: Prisma.linkWhereUniqueInput): Promise<link> {
      return this.prisma.link.delete({
        where,
      });
    }

    /**
     * - Wrapper around redirect 
     * - Resolve the hashId or customhashid 
     * @param Id 
     * @returns 
     */
    async resolveRedirect(Id: string): Promise<string> {
      const validHashIdRegex = /^[0-9]*$/;
      if(validHashIdRegex.test(Id)){
          return this.redirect(Id);
      }
      else
      { 
        const hashId = await this.redisUtils.fetchKey(Id);
        if(hashId == undefined ){
          const linkData = await this.prisma.link.findFirst({
            where: { customHashId: Id},
          });
          
          let response = "";
          !(linkData == null) ? response = await this.redirect(linkData.hashid.toString()):0;
          return response;
        }
        else{
          return this.redirect(hashId);
        }
      }
    }

    /**
     * A generic function to fetch the url from redis based on hashId 
     * Fallback to DB if the hashId is not found in redis
     * @param hashid 
     * @returns 
     */
    async redirect(hashid: string): Promise<string> {

          return this.redisUtils.fetchKey(hashid).then((value: string) => {
          const link = JSON.parse(value);

          const url = link.url
          const params = link.params
          const ret = [];
          
          if(params?.["status"] == "expired"){
            return "";
          }

          if(params == null){
            return url;
          }else {
            Object.keys(params).forEach(function(d) {
              ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(params[d]));
            })
            return `${url}?${ret.join('&')}` || '';
          }
        })
        .catch(err => {
            this.telemetryService.sendEvent(this.configService.get<string>('POSTHOG_DISTINCT_KEY'), "Exception in fetching data from redis falling back to DB", {error: err.message})
            return this.redirectFromDB(hashid);
          });

    }

    /**
     * resolves the url from DB based on hashId
     * Fallback to DB if the hashId is not found in redis
     * @param hashid 
     * @returns 
     */
    async redirectFromDB(hashid: string): Promise<string> {
        return this.prisma.link.findMany({
          where: {
            OR: [
              {
                hashid: Number.isNaN(Number(hashid)) ? -1 : parseInt(hashid),
              },
              { customHashId: hashid },
            ]
          },
          take: 1
        })
        .then(response => {
          const url = response[0].url
          const params = response[0].params
          const ret = [];
          
          const currentDate = new Date();
          var currentTime = currentDate.getTime();
          var createdAt = response[0].createdAt.getTime();
          console.log("currentTime",currentTime,"createdAt",createdAt,"expiry",params?.["expiry"]);

          if(!Number.isNaN(parseInt(params?.["expiry"])) && (currentTime > (createdAt+60*parseInt(params?.["expiry"])))){
            console.log("expired link clearing from DB and redis");
            // delete from DB and redis !!!
            // this.deleteLink({id: response[0].id}); // don't delete from DB keep it there
            this.redisUtils.clearKey(response[0]);
            return "";
          }

          // Drawback: link won't get clear until it is clicked after expiry
          // Sol: set a cron job to clear the expired links from DB and redis
          // TO DO: DO deletion asynchronously

          this.redisUtils.setKey(response[0]); 

          if(params == null){
            return url;
          }else {
            Object.keys(params).forEach(function(d) {
              ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(params[d]));
            })
            return `${url}?${ret.join('&')}` || '';
          }
        })
        .catch(err => {
          this.telemetryService.sendEvent(this.configService.get<string>('POSTHOG_DISTINCT_KEY'), "Exception in getLinkFromHashIdOrCustomHashId query", {error: err.message})
          return '';
        });
    }
}
