<p align="center">
   <img src="https://res.cloudinary.com/dnv-images/image/upload/v1631599120/Blanja%20com/blanja_pdgveq.svg">
</p>
<h1 align="center">Ecommerce API</h1>

<p align="center">
    <a href="https://bit.ly/blanja_react" target="_blank">View Demo</a>
    ·
    <a href="https://github.com/emhaarifin/ecommerce-api/issues" target="_blank">Report Bug</a>
    ·
    <a href="https://github.com/emhaarifin/ecommerce-api/pulls" target="_blank">Request Feature</a>
</p>
<br/>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
        <ol>
            <li>
                <a href="#build-with">Build With</a>
            </li>
        </ol>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ol>
        <li>
          <a href="#installation">Installation</a>
        </li>
        <li>
          <a href="#prerequisites">Prerequisites</a>
        </li>
        <li>
          <a href="#related-project">Related Project</a>
        </li>
      </ol>
    </li>
    <li><a href="#ecommerce-api-documentation">Ecommerce API Documentation</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

<b>Blanja</b> is an online store that currently focuses on the fashion market. sellers can promote their products and customers can buy what they need.

### Build With
* [Express Js](https://expressjs.com/)
* [Node Js](https://nodejs.org/en/)
* [MySQL](https://www.mysql.com/)
* [Json Web Token](https://jwt.io/)
* [Nodemailer](https://nodemailer.com/about/)

## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* [Node Js](https://nodejs.org/en/download/)
* [MySQL](https://www.mysql.com/downloads/)
* [Postman](https://www.postman.com/downloads/)

### Installation
    
1. Clone These 2 Repos (Backend and Frontend)
```sh
https://github.com/emhaarifin/ecommerce-api
```
2. Go To Folder Repo
```sh
cd ecommerce-api
```
3. Install Module
```sh
npm install
```
4. Make a new database and import sql file at folder src/sql
5. Add .env file at root folder project, and add following
```sh
DB_HOST = [DB_HOST]
DB_USER = [DB_USER]
DB_NAME = [DB_NAME]
DB_PASS = [DB_PASS]
DB_PORT = [PORT_EXPRESS]
REDIL_URL = [REDIS_PORT]
BASE_URL = [URL_LOCAL_BACKEND]
SECRET_KEY = [JWT_SECRET_KEY]
REFRESH_TOKEN = [JWT_SECRET_KET]
URL_FRONT_END = [URL_LOCAL_FRONTEND]
```
6. Starting application
```sh
npm run dev
```
7. Testing with Postman
    * [Ecommerce Postman APIs Collection](https://documenter.getpostman.com/view/10604967/UUxtEAPX)

### Related Project

* [`Frontend-Blanja`](https://github.com/emhaarifin/React-Blanja)
* [`Backend-Ecommerce`](https://github.com/emhaarifin/ecommerce-api)

## Ecommerce API Documentation
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/64c3c4d9f8dedefd90ed)

## Contact
My Email : 101muhammadarifin@gmail.com

Project Link: [https://github.com/emhaarifin/ecommerce-api](https://github.com/emhaarifin/ecommerce-api)
