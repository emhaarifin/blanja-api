<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/emhaarifin/ecommerce-api">
    <img src="https://res.cloudinary.com/dnv-images/image/upload/v1631599120/Blanja%20com/blanja_pdgveq.svg" alt="Logo" width="140" height="194">
  </a>

  <h3 align="center">Ecommerce API</h3>

  <p align="center">
    This is a simple CRUD API that I created using node js and the express js framework.
    <br />
    <a href="https://github.com/emhaarifin/ecommerce-api" target="_blank"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://bit.ly/blanja-netlify">View Demo</a>
    ·
    <a href="https://github.com/emhaarifin/ecommerce-api/issues">Report Bug</a>
    ·
    <a href="https://github.com/emhaarifin/ecommerce-api/pulls">Request Feature</a>
  </p>
</p>

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

<b>Blanja</b> is an online shop that currently focuses on the fashion market. Allows sellers to market their fashion products and customers can buy the best and cheap fashion needs.

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
<!-- 4. Make a new database and import [blanja-sample.sql](https://drive.google.com/file/d/1N7WlJEPonnIwcRwnVA3yN0EmCXes4dWJ/view?usp=sharing) -->
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
