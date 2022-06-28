# Yaus API

## Nouns

### Project
- Name
- Roles

### User
- Name
- Email
- API Token
    - Registrations
        - Project
            - Role
- Links
    - Config
        - Short link
        - Redirects
            - Deeplink URL (Android)
            - Deeplink URL (iOS)
            - Long link
                - Analytics Tags
                - Custom KV Pairs
        - Expiration
        - Clicks
    - Workflow

### TenantConfig
- Domain
- Plugins

### ClickEvent
- Link
- IP
- UserAgent
- Cookie
- Device
- FingerprintID

### Device
- Device Name
- Device OS
- Device OS Version
- Device Model
- Device Manufacturer
- Device Brand
- Device Model Name
- Device Model Number
- Device Serial Number
- Device Screen Size

### Plugin
- Config
    - RemoteServiceCall
- Link
- ClickEvent

### RemoteServiceCallEvent
- Service
- Method
- Params
- Result
- Error
- Duration
- StartedAt
- FinishedAt


## POST /tenants

