import { ApiProperty } from "@nestjs/swagger"
export class Link {
    @ApiProperty({
        description: 'Unique Id of Link',
      })
    id?: string
    @ApiProperty({
        description: 'Unique User ID of Link',
      })
    user?: string | null
    @ApiProperty({
        description: 'Tags Related to Link',
      })
    tags?: Array<string>
    @ApiProperty({
        description: 'Number of clicks on Link',
      })
    clicks?: number
    @ApiProperty({
        description: 'URL to redirect to',
      })
    url?: string | null
    @ApiProperty({
        description: 'HashID of Link',
      })
    hashid?: number
    @ApiProperty({
        description: 'ProjectID of Link',
      })
    project?: string | null
    @ApiProperty({
        description: 'Custom HashID of Link',
      })
    customHashId?: string | null
}
