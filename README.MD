# MEAL TRACKER

A simple backend API that keeps track of employees and their meal status for the day. It allows employees to recieve only one meal a day. This API eliminates the chances of one employee taking more than one meal a day.

### Technologies

<div align="center">

  <a href="">![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)</a>
  <a href="">![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)</a>
  <a href="">![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)</a>
  
  
</div>
<div align="center">

  <a href="">![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)</a>
  <a href="">![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)</a>

</div>

### Installation
 
Firstly, you need to clone the repository into your local machine
```javascript
$ git clone https://github.com/victoria-igbobi65/beerkathon.git
```
Secondly, change directory into the project file
```
$ cd chatbot 
```
Thirdly, you need to install the dependencies.
```javascript
$ npm i 
``` 
Fourthly, you need to create a `.env` file and copy the `.env.example` file to it.
```javascript
$ cp .env.example .env 
```
Finally, you need to run the server.
```java
$ npm run start
```

### Testing
To run the test
```
npm run test
```

### Base URL


### Usage

#### Registration

* Route: /api/v1/auth/signup
* Method: POST
* Body:
```java
{
  email: Myemail@gmail.com,
  id: employeeId /* A unique ID of numbers with length of 5 */
}
```

```java
* Response:
  * 201: success || Created
  * 409: error || Conflict Error
  * 400: error || Bad Request
  * 401: error || Unauthorized Error
  * 500: error || Server Error
```

#### User Login
* Route: /api/v1/auth/login
* Method: POST
* Body: 
```java
{
  id: Myemail@gmail.com || employeeID /* Staff can log in with their email or ID */,
  password: mypassword
}

```
* Response
```java
  200: success
  400: error || Bad Request
  500: error || Server Error
```


#### Vendor Login
* Route: /api/v1/auth/vendor/login
* Method: POST
* Body: 
```java
{
  id: Myemail@gmail.com,
  password: mypassword
}

```
* Response
```java
  200: success
  400: error || Bad Request
  500: error || Server Error
```

#### Admin Login
* Route: /api/v1/auth/admin/login
* Method: POST
* Body: 
```java
{
  id: Myemail@gmail.com,
  password: mypassword
}

```
* Response
```java
  200: success
  400: error || Bad Request
  500: error || Server Error
```

#### Create New Order
* Route: /api/v1/ticket/
* Method: POST
* Body: 
```java
{
  category: meal Category,
  meal: meal name,
  price: price
}

```
* Response status Codes: 
```java
  201: success || Created
  401: error || Unauthorized
  400: error || Bad Request
  403: error || Forbidden Error
  500: error || Server Error
```

#### Update Order
* Route: /api/v1/ticket/:id
* Method: PATCH
* Body: {}
* Response
```java
  200: success 
  401: error || Unauthorized
  403: error || Forbidden
  404: error || Not Found Error
  500: error || Server Error
```


#### Get all orders
* Route: /api/v1/ticket/
* Method: GET
* Query: 
  * filter: filters order by status, either in progress or already served.
    ```java
      /api/v1/ticket?status=served
    ```
  * sort : sort orders in ascending or descending order given a specified format. To sort in descending order, add a `-` prefix before a field, seperate multiple values with a `,`.
  Accepted Values:
    * createdAt
    ```java
      /api/v1/ticket/?sort=createdAt
    ```
  * page [default: 1]
  * limit [default: 20] 
  ```java
    /api/v1/ticket/?page=1&limit=10
  ```
* Response

```java
  200: success
  401: error || Unauthorized
  403: error || Forbidden Error
  500: error || Server Error
```
