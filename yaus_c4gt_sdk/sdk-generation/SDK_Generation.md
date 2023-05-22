#  **SDK Generation**

## Types of ways of SDK generation
- Readme/api
- Manually Through Code
- AWS SDK Generation


## Let's see all of them one by one
<br>

## -> **Readme/api**

`api` is a library that facilitates creating an SDK from an OpenAPI definition. You can use its codegen offering to create an opinionated SDK for `TypeScript` or JS (+ TypeScript types).

Read the docs here: https://api.readme.dev/docs

## Steps Followed

- For making your own SDK execute the following command with your own api.

- ```$ npx api install <path to an OpenAPI definition>```

- During this process it will ask you some options like "Typescript" or "Javascript".

- And will also ask you the name for your sdk which will appear like this `@api/name-for -the-sdk`.

- Check your package.json for the downloaded dependency.

- Now install your own created library with the following command

- `npm install @api/your-sdk-name`
<br>
<br>
<br>

![](images\ss.png)

- We can use our own created SDK like you use any other sdk.

- An example is shown here:
<br>
<br>


![](images\ss2.png)

<br>
<br>

## Time taken to build

- As it requires to execute one command with the open spec defination of your specific API, the time taken to build the SDK will be comparitively less.


## Customised logic

- As `api` is a library through which we are generating the SDK, everything is basically hard coded.

- We can use the generated SDK in whichever form we want, but the SDK will be generated in the same way.

- The generated SDK will support API authentication through an sdk.auth() method:

- Eg:  `API Keys: sdk.auth('myApiKey')`

- The generated SDK supports GET, PUT, POST, DELETE, OPTIONS, HEAD, and TRACE requests.

- So in this way the SDK will be quite flexible for personalised use.
<br>
<br>
<br>

## -> **Manually Through Code**
<br>

- For manually making an SDK you need to start by becoming the most familiar, most knowledgeable, most comprehensive expert in that space.

- This is not a question of enthusiasm, talent, or self-confidence; it is simply detailed, hard work over time.
<br>

## Time taken to build

- If you want to write an SDK to work with a REST API, for example, you need to know everything about that API: all of its endpoints, requirements, and behaviors, which requires a lot of time and skill.

- All of the types of inputs, and all of its outputs. In general, it helps to be (or become) an expert in the higher-level concepts that govern that API, so becoming an expert in REST in general will behoove you.

## Customised Logic


- If you’re working in a web context, you’ll collect reference materials such as HTTP status codes, lists of MIME types, and browser support for emerging technologies to ensure your SDK is backwards-compatible to whichever browser versions you choose to support.

<br>
<br>

## -> **AWS SDK Generator**
<br>

- We can use AWS SDK Generator for generating automatic SDKs but the catch here is that you can make this in JavaScript here as this AWS supports JavaScript only.
<br>
<br>
 - Here we can see that we can form our own REST API using the API Gateway or can also import any existing API.

<br>

 ![](images\s3.png)

<br>
<br>

 - In the SDK Generation tab we can find these many platforms on which the SDK can be generated.
 <br>
<br>

![](images\s4.png)

- After clickig on `Generate SDK` your SDK will be downloaded in the form of a zip folder.


## Time to build

- This will not take a lot of time to generate the SDK as it is all UI interfaced.

## Customised Logic

- AWS supports platforms like Android, JavaScript,IOS, Java, Ruby.

- AWS SDK Generator provides you a lot of steps for choosing the API, Importing an existing one etc.

- These are some of the APIs you can choose from or you can also import the swagger defination for your API.


![](images\s5.png)
<br>
<br>
- So if you want your SDK to be in JavaScript , you can try this.

<br>

## **🚀After examining all these methods, I think Readme/api is the best method to generate a SDK as it is easy, userfriendly and also allows to use your SDK flexibly.**

