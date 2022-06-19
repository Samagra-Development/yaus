/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api/src/app/app.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const microservices_1 = __webpack_require__("@nestjs/microservices");
const terminus_1 = __webpack_require__("@nestjs/terminus");
const app_interface_1 = __webpack_require__("./apps/api/src/app/app.interface.ts");
const app_service_1 = __webpack_require__("./apps/api/src/app/app.service.ts");
const router_service_1 = __webpack_require__("./apps/api/src/app/router/router.service.ts");
const addROToResponseInterceptor_1 = __webpack_require__("./apps/api/src/app/interceptors/addROToResponseInterceptor.ts");
let AppController = class AppController {
    constructor(appService, routerService, http, healthCheckService, clickServiceClient) {
        this.appService = appService;
        this.routerService = routerService;
        this.http = http;
        this.healthCheckService = healthCheckService;
        this.clickServiceClient = clickServiceClient;
    }
    checkHealth() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.healthCheckService.check([]);
        });
    }
    /*
    @Deprecated
    */
    // @Get('/sr/:code')
    // async handler(@Param('code') code: string, @Res() res) {
    //   const resp = await this.routerService.decodeAndRedirect(code)
    //   this.clickServiceClient
    //     .send('onClick', {
    //       hashid: resp.hashid,
    //     })
    //     .subscribe();
    //   if (resp.url !== '') {
    //     return res.redirect(resp.url);
    //   } else {
    //     throw new NotFoundException();
    //   }
    // }
    //http://localhost:3333/api/redirect/208
    redirect(hashid, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const reRouteURL = yield this.routerService.redirect(hashid);
            this.clickServiceClient
                .send('onClick', {
                hashid: parseInt(hashid),
            })
                .subscribe();
            if (reRouteURL !== '') {
                return res.redirect(reRouteURL);
            }
            else {
                throw new common_1.NotFoundException();
            }
        });
    }
    register(link) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.appService.createLink(link);
        });
    }
    update(id, link) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.appService.updateLink({
                where: { customHashId: id },
                data: {
                    user: link.user || null,
                    tags: link.tags || null,
                    clicks: link.clicks || null,
                    url: link.url || null,
                    hashid: link.hashid || null,
                    project: link.project || null,
                    customHashId: link.customHashId || null,
                },
            });
        });
    }
    getNotifications(data, context) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(`Pattern: ${context.getPattern()}`);
            const channel = context.getChannelRef();
            const originalMsg = context.getMessage().content.toString();
            console.log(`Message: ${originalMsg}`);
            yield this.appService.updateClicks(JSON.parse(originalMsg).data.hashid);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('/health'),
    (0, terminus_1.HealthCheck)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "checkHealth", null);
tslib_1.__decorate([
    (0, common_1.Get)('/:hashid'),
    tslib_1.__param(0, (0, common_1.Param)('hashid')),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "redirect", null);
tslib_1.__decorate([
    (0, common_1.Post)('/register'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_interface_1.Link !== "undefined" && app_interface_1.Link) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], AppController.prototype, "register", null);
tslib_1.__decorate([
    (0, common_1.Patch)('update/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_c = typeof app_interface_1.Link !== "undefined" && app_interface_1.Link) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AppController.prototype, "update", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)('onClick'),
    tslib_1.__param(0, (0, microservices_1.Payload)()),
    tslib_1.__param(1, (0, microservices_1.Ctx)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, typeof (_e = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "getNotifications", null);
AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseInterceptors)(addROToResponseInterceptor_1.AddROToResponseInterceptor),
    tslib_1.__param(4, (0, common_1.Inject)('CLICK_SERVICE')),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _f : Object, typeof (_g = typeof router_service_1.RouterService !== "undefined" && router_service_1.RouterService) === "function" ? _g : Object, typeof (_h = typeof terminus_1.HttpHealthIndicator !== "undefined" && terminus_1.HttpHealthIndicator) === "function" ? _h : Object, typeof (_j = typeof terminus_1.HealthCheckService !== "undefined" && terminus_1.HealthCheckService) === "function" ? _j : Object, typeof (_k = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _k : Object])
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ "./apps/api/src/app/app.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/api/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const app_controller_1 = __webpack_require__("./apps/api/src/app/app.controller.ts");
const app_service_1 = __webpack_require__("./apps/api/src/app/app.service.ts");
const nestjs_redis_1 = __webpack_require__("nestjs-redis");
const router_service_1 = __webpack_require__("./apps/api/src/app/router/router.service.ts");
const microservices_1 = __webpack_require__("@nestjs/microservices");
const telemetry_service_1 = __webpack_require__("./apps/api/src/app/telemetry/telemetry.service.ts");
const prisma_service_1 = __webpack_require__("./apps/api/src/app/prisma.service.ts");
const terminus_1 = __webpack_require__("@nestjs/terminus");
const nestjs_posthog_1 = __webpack_require__("nestjs-posthog");
const nestjs_simple_redis_lock_1 = __webpack_require__("@huangang/nestjs-simple-redis-lock");
const nestjs_redis_2 = __webpack_require__("nestjs-redis");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env.local', '.env'],
            }),
            nestjs_redis_1.RedisModule.forRootAsync({
                useFactory: (config) => {
                    return {
                        name: config.get('REDIS_NAME'),
                        url: config.get('REDIS_URI'),
                    };
                },
                inject: [config_1.ConfigService],
            }),
            nestjs_simple_redis_lock_1.RedisLockModule.registerAsync({
                useFactory: (redisManager) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
                    return { prefix: ':lock:', client: redisManager.getClient() };
                }),
                inject: [nestjs_redis_2.RedisService]
            }),
            microservices_1.ClientsModule.registerAsync([
                {
                    name: 'CLICK_SERVICE',
                    imports: [config_1.ConfigModule],
                    useFactory: (config) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
                        return ({
                            transport: microservices_1.Transport.RMQ,
                            options: {
                                urls: [config.get('RMQ_URL')],
                                queue: config.get('RMQ_QUEUE'),
                                queueOptions: {
                                    durable: config.get('RMQ_QUEUE_DURABLE'),
                                },
                            },
                        });
                    }),
                    inject: [config_1.ConfigService],
                },
            ]),
            nestjs_posthog_1.PosthogModule.forRootAsync({
                useFactory: (config) => {
                    return {
                        apiKey: config.get('POSTHOG_API_KEY'),
                        options: {
                            host: config.get('POSTHOG_API_HOST'),
                            flushAt: config.get('POSTHOG_BATCH_SIZE'),
                            flushInterval: config.get('POSTHOG_FLUSH_INTERVAL'),
                        },
                        mock: false,
                    };
                },
                inject: [config_1.ConfigService],
            }),
            terminus_1.TerminusModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, config_1.ConfigService, router_service_1.RouterService, prisma_service_1.PrismaService, telemetry_service_1.TelemetryService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/api/src/app/app.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const nestjs_redis_1 = __webpack_require__("nestjs-redis");
const prisma_service_1 = __webpack_require__("./apps/api/src/app/prisma.service.ts");
let AppService = class AppService {
    constructor(redisService, prisma) {
        this.redisService = redisService;
        this.prisma = prisma;
    }
    updateClicks(urlId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const client = yield this.redisService.getClient(process.env.REDIS_NAME);
            client.incr(urlId);
        });
    }
    fetchAllKeys() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const client = yield this.redisService.getClient(process.env.REDIS_NAME);
            const keys = yield client.keys('*');
            return keys;
        });
    }
    updateClicksInDb() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const client = yield this.redisService.getClient(process.env.REDIS_NAME);
            const keys = yield this.fetchAllKeys();
            for (var key of keys) {
                client.get(key).then((value) => {
                    const updateClick = this.prisma.link.updateMany({
                        where: {
                            OR: [
                                {
                                    hashid: parseInt(key),
                                },
                                {
                                    customHashId: key
                                }
                            ],
                        },
                        data: {
                            clicks: parseInt(value),
                        },
                    });
                });
            }
        });
    }
    link(linkWhereUniqueInput) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.link.findUnique({
                where: linkWhereUniqueInput,
            });
        });
    }
    links(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { skip, take, cursor, where, orderBy } = params;
            return this.prisma.link.findMany({
                skip,
                take,
                cursor,
                where,
                orderBy,
            });
        });
    }
    createLink(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.link.create({
                data,
            });
        });
    }
    updateLink(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { where, data } = params;
            return this.prisma.link.update({
                data,
                where,
            });
        });
    }
    deleteLink(where) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.link.delete({
                where,
            });
        });
    }
};
AppService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof nestjs_redis_1.RedisService !== "undefined" && nestjs_redis_1.RedisService) === "function" ? _a : Object, typeof (_b = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _b : Object])
], AppService);
exports.AppService = AppService;


/***/ }),

/***/ "./apps/api/src/app/interceptors/addROToResponseInterceptor.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddROToResponseInterceptor = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const rxjs_1 = __webpack_require__("rxjs");
const telemetry_service_1 = __webpack_require__("./apps/api/src/app/telemetry/telemetry.service.ts");
/**
 * @description
 * Adds response object created in addResponseObject.interceptor.ts to the response body.
 */
let AddROToResponseInterceptor = class AddROToResponseInterceptor {
    constructor(telemetryService) {
        this.telemetryService = telemetryService;
    }
    intercept(context, next) {
        const now = Date.now();
        const req = context.switchToHttp().getRequest();
        ;
        return next.handle().pipe((0, rxjs_1.map)((data) => {
            let name;
            console.log(`Execution Time: ${Date.now() - now}ms`);
            this.telemetryService.sendEvent(process.env.POSTHOG_DISTINCT_KEY, `${req.raw.url} Execution Time`, { routeName: name, executionTime: `${Date.now() - now}ms` });
            return data;
        }));
    }
};
AddROToResponseInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof telemetry_service_1.TelemetryService !== "undefined" && telemetry_service_1.TelemetryService) === "function" ? _a : Object])
], AddROToResponseInterceptor);
exports.AddROToResponseInterceptor = AddROToResponseInterceptor;


/***/ }),

/***/ "./apps/api/src/app/prisma.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const client_1 = __webpack_require__("@prisma/client");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    onModuleInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.$connect();
        });
    }
    enableShutdownHooks(app) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.$on('beforeExit', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                yield app.close();
            }));
        });
    }
};
PrismaService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], PrismaService);
exports.PrismaService = PrismaService;


/***/ }),

/***/ "./apps/api/src/app/router/queries.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateCustomId = exports.updateCustomHashClicks = exports.incrementClicks = exports.updateClicks = exports.getUniqueLinkID = exports.insertLink = exports.getLinkFromCustomHash = exports.getLink = exports.getLinkFromHashIdOrCustomHashId = exports.getLinkFromHashID = exports.getLinkFromHash = exports.getTemplateFromID = exports.getLastLink = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_tag_1 = __webpack_require__("graphql-tag");
const getLastLink = (client, variables) => client.query({
    query: (0, graphql_tag_1.default) `
      query getLastLink {
        link(limit: 1, order_by: { hashid: desc }) {
          id
          user
          url
          tags
          hashid
          clicks
        }
      }
    `,
    variables,
});
exports.getLastLink = getLastLink;
const getTemplateFromID = (client, variables) => client.query({
    query: (0, graphql_tag_1.default) `
      query getTemplateByID($templateID: uuid) {
        template(where: { id: { _eq: $templateID } }) {
          text
        }
      }
    `,
    variables,
});
exports.getTemplateFromID = getTemplateFromID;
const getLinkFromHash = (client, variables) => client.query({
    query: (0, graphql_tag_1.default) `
      query getTemplateByID($templateID: uuid) {
        template(where: { id: { _eq: $templateID } }) {
          text
        }
      }
    `,
    variables,
});
exports.getLinkFromHash = getLinkFromHash;
const getLinkFromHashID = (client, variables) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return client
        .query({
        query: (0, graphql_tag_1.default) `
        query getLinkFromHashID($hashid: Int) {
          link(where: { hashid: { _eq: $hashid } }) {
            url
            hashid
            customHashId
          }
        }
      `,
        variables,
    })
        .then((response) => response.data)
        .catch((e) => {
        console.log(e);
        return null;
    });
});
exports.getLinkFromHashID = getLinkFromHashID;
const getLinkFromHashIdOrCustomHashId = (client, variables) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return client
        .query({
        query: (0, graphql_tag_1.default) `
        query getLinkFromHashIdOrCustomHashId($hashid: Int, $customHashId: String) {
          link(where: { hashid: { _eq: $hashid }, _or: {customHashId: { _eq: $customHashId }}}) {
            url
            hashid
            customHashId
          }
        }
      `,
        variables,
    })
        .then((response) => response.data)
        .catch((e) => {
        console.log(e);
        return null;
    });
});
exports.getLinkFromHashIdOrCustomHashId = getLinkFromHashIdOrCustomHashId;
const getLink = (client, variables) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return client
        .query({
        query: (0, graphql_tag_1.default) `
        query getLink($hashid: Int, $customHashId: String!) {
          link(
            where: {
              _or: [
                { customHashId: { _eq: $customHashId } }
                { hashid: { _eq: $hashid } }
              ]
            }
          ) {
            url
            hashid
            customHashId
            id
          }
        }
      `,
        variables,
    })
        .then((response) => {
        return response.data;
    })
        .catch((e) => {
        console.log(e);
        return null;
    });
});
exports.getLink = getLink;
const getLinkFromCustomHash = (client, variables) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return client
        .query({
        query: (0, graphql_tag_1.default) `
        query getLinkFromHashID($customHashId: String) {
          link(where: { customHashId: { _eq: $customHashId } }) {
            url
            hashid
            customHashId
          }
        }
      `,
        variables,
    })
        .then((response) => response.data)
        .catch((e) => null);
});
exports.getLinkFromCustomHash = getLinkFromCustomHash;
const insertLink = (client, variables) => client.mutate({
    mutation: (0, graphql_tag_1.default) `
      mutation addNewLink(
        $url: String
        $userID: uuid
        $project: uuid
        $customHashId: String
      ) {
        insert_link(
          objects: {
            url: $url
            user: $userID
            project: $project
            customHashId: $customHashId
          }
          on_conflict: {
            export constraint: link_user_project_url_customHashId_key
            update_columns: user
          }
        ) {
          returning {
            clicks
            hashid
            id
            project
            tags
            url
            user
            customHashId
          }
        }
      }
    `,
    variables,
});
exports.insertLink = insertLink;
const getUniqueLinkID = (client, variables) => client
    .query({
    query: (0, graphql_tag_1.default) `
        query getUniqueLink($url: String, $user: uuid, $project: uuid) {
          link(
            where: {
              _and: [
                { url: { _eq: $url } }
                { user: { _eq: $user } }
                { project: { _eq: $project } }
              ]
            }
          ) {
            hashid
          }
        }
      `,
    variables,
})
    .then((res) => {
    return res.data.link[0].hashid;
});
exports.getUniqueLinkID = getUniqueLinkID;
const updateClicks = (client, variables) => {
    client
        .mutate({
        mutation: (0, graphql_tag_1.default) `
            mutation udpateClicks($hashid: Int, $customHashId: String) {
              update_link(
                where: { hashid: { _eq: $hashid }, _or: { customHashId: { _eq: $customHashId } } }
                _set: { clicks: $clicks }
              ) {
                returning {
                  clicks
                }
              }
            }
          `,
        variables,
    })
        .then((res) => {
        console.log(res);
    })
        .catch((e) => {
        console.log(e);
    });
};
exports.updateClicks = updateClicks;
const incrementClicks = (client, variables) => {
    client
        .mutate({
        mutation: (0, graphql_tag_1.default) `
        mutation udpateClicks($hashid: Int) {
          update_link(
            where: { hashid: { _eq: $hashid } }
            _inc: { clicks: 1 }
          ) {
            returning {
              clicks
            }
          }
        }
      `,
        variables,
    })
        .then((res) => {
        console.log(res);
    })
        .catch((e) => {
        console.log(e);
    });
};
exports.incrementClicks = incrementClicks;
const updateCustomHashClicks = (client, variables) => {
    client
        .mutate({
        mutation: (0, graphql_tag_1.default) `
        mutation updateClicks($id: uuid) {
          update_link(where: { id: { _eq: $id } }, _inc: { clicks: 1 }) {
            returning {
              clicks
            }
          }
        }
      `,
        variables,
    })
        .then((res) => { })
        .catch((e) => {
        console.log(e);
    });
};
exports.updateCustomHashClicks = updateCustomHashClicks;
const updateCustomId = (client, variables) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return client
        .mutate({
        mutation: (0, graphql_tag_1.default) `
        mutation update_custom_id($hashid: Int, $customhash: String) {
          update_link(
            where: { hashid: { _eq: $hashid } }
            _set: { customHashId: $customhash }
          ) {
            returning {
              customHashId
            }
          }
        }
      `,
        variables,
    })
        .then((res) => {
        console.log('REs', typeof JSON.stringify(res.data.update_link.returning));
        return res.data.update_link.returning;
    })
        .catch((e) => {
        console.log(e);
        return e;
    });
});
exports.updateCustomId = updateCustomId;


/***/ }),

/***/ "./apps/api/src/app/router/router.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RouterService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const Hashids = __webpack_require__("hashids");
const client_1 = __webpack_require__("@apollo/client");
const queries_1 = __webpack_require__("./apps/api/src/app/router/queries.ts");
const isomorphic_fetch_1 = __webpack_require__("isomorphic-fetch");
let RouterService = class RouterService {
    constructor(configService) {
        this.configService = configService;
        this.getClient = (uri, headers) => {
            return new client_1.ApolloClient({
                link: new client_1.HttpLink({
                    uri: uri,
                    headers: headers,
                    fetch: isomorphic_fetch_1.fetch,
                }),
                cache: new client_1.InMemoryCache(),
            });
        };
        this.dbClient = this.getClient(this.configService.get('GRAPHQL_URI'), {
            'x-hasura-admin-secret': this.configService.get('HASURA_ADMIN_SECRET'),
            'content-type': 'application/json',
        });
        this.hashids = new Hashids();
    }
    redirect(hashid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const response = yield (0, queries_1.getLinkFromHashIdOrCustomHashId)(this.dbClient, {
                hashid: parseInt(hashid),
                customHashId: hashid,
            });
            return response.link[0].url || '';
        });
    }
    decodeAndRedirect(code) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let hashid = -1;
            try {
                hashid = this.hashids.decode(code)[0];
            }
            catch (e) {
                hashid = -1;
            }
            if (!hashid)
                hashid = -1;
            const redirectURL = yield (0, queries_1.getLink)(this.dbClient, {
                hashid,
                customHashId: code,
            });
            return { url: redirectURL.link[0].url || '', hashid: hashid };
        });
    }
};
RouterService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], RouterService);
exports.RouterService = RouterService;


/***/ }),

/***/ "./apps/api/src/app/telemetry/telemetry.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TelemetryService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const nestjs_posthog_1 = __webpack_require__("nestjs-posthog");
let TelemetryService = class TelemetryService {
    constructor(client) {
        this.client = client;
    }
    sendEvent(distinctId, event, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.capture({
                    distinctId: distinctId,
                    event: event,
                    properties: data,
                });
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
};
TelemetryService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof nestjs_posthog_1.PosthogService !== "undefined" && nestjs_posthog_1.PosthogService) === "function" ? _a : Object])
], TelemetryService);
exports.TelemetryService = TelemetryService;


/***/ }),

/***/ "@apollo/client":
/***/ ((module) => {

module.exports = require("@apollo/client");

/***/ }),

/***/ "@huangang/nestjs-simple-redis-lock":
/***/ ((module) => {

module.exports = require("@huangang/nestjs-simple-redis-lock");

/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/microservices":
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/platform-fastify":
/***/ ((module) => {

module.exports = require("@nestjs/platform-fastify");

/***/ }),

/***/ "@nestjs/swagger":
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "@nestjs/terminus":
/***/ ((module) => {

module.exports = require("@nestjs/terminus");

/***/ }),

/***/ "@prisma/client":
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "graphql-tag":
/***/ ((module) => {

module.exports = require("graphql-tag");

/***/ }),

/***/ "hashids":
/***/ ((module) => {

module.exports = require("hashids");

/***/ }),

/***/ "isomorphic-fetch":
/***/ ((module) => {

module.exports = require("isomorphic-fetch");

/***/ }),

/***/ "nestjs-posthog":
/***/ ((module) => {

module.exports = require("nestjs-posthog");

/***/ }),

/***/ "nestjs-redis":
/***/ ((module) => {

module.exports = require("nestjs-redis");

/***/ }),

/***/ "rxjs":
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const platform_fastify_1 = __webpack_require__("@nestjs/platform-fastify");
const app_module_1 = __webpack_require__("./apps/api/src/app/app.module.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        // API for YAUS
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
        // // MS for managing side-effects
        // app.connectMicroservice<MicroserviceOptions>({
        //   transport: Transport.RMQ,
        //   options: {
        //     urls: ['amqp://username:password@localhost:5672'],
        //     queue: 'clicks',
        //     queueOptions: {
        //       durable: false,
        //     },
        //   },
        // });
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        const config = new swagger_1.DocumentBuilder()
            .setTitle('YAUS - Yet Another URL Shortener')
            .setDescription('YAUS APIS')
            .setVersion('1.0')
            .addTag('yaus')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api', app, document);
        const port = process.env.PORT || 3333;
        yield app.startAllMicroservices();
        yield app.listen(port);
        common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map