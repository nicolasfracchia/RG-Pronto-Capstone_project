<details> 
    <summary><h1>PROJECT DESCRIPTION</h1></summary>
<h3>APP NAME: PRONTO</h3>
<details>
    <summary><h3>SHORT DESCRIPTION:</h3></summary>

Streamlined E-commerce for a small Italian restaurant.

This project is intended to simplify web management for non-tech-savvy owners and managers, enabling effortless updates to products and prices. This solution amplifies online visibility, attracting new customers and fostering loyalty among existing ones.
</details>
<details>
    <summary><h3>LIST OF FEATURES:</h3></summary>

1. **TECH STACK:**
    * ***MySQL database:*** Centralized storage for business information.
    * ***NodeJS API:*** using Express and Sequelize for effective communication with internal and external services or applications.
    * ***HTML Website:*** SEO-optimized platform for web presence and customer acquisition.
    * ***IONIC / Angular Web-App:*** Enhances customer loyalty and streamlines business processes.
2. **FUNCTIONALITY:**
    * ***User Management:*** Facilitates the creation, retrieval, updating, and deletion (CRUD) of users with essential details, user types (admin, employee, customer), and login credentials.
    * ***Product Management:*** Enables CRUD operations for products, incorporating categories, prices, and images. This functionality is integral for website construction and empowers customers to place orders. Integration of a camera plugin ensures seamless updating of product images.
    * ***Order Management:*** Streamlines CRUD processes for orders, encompassing vital information for users placing orders, employees tracking them, and admins generating insightful reports."
</details>
<details>
    <summary><h3>FUTURE FEATURES:</h3></summary>

1. Online Payment Integration.
2. Customer point rewards and redemption in-store or online.
3. Push notifications.
4. Automatic/Scheduled Reports.
5. New customizations for the website.
</details>
<details>
    <summary><h3>APPLICATION USERS:</h3></summary>

1. ***Admins:*** Full access to every feature.
2. ***Employees:*** Customer-level acces and limited management access.
3. ***Customers:*** Access limited to website navigation and own orders.
</details>
<details>
    <summary><h3>TYPE OF APPLICATION: WEB AND MOBILE</h3></summary>

1. ***Website:*** HTML, SCSS and Bootstrap to improve SEO.
2. ***Ionic / Angular:*** Cross-platform APP for customers and internal management.
</details>
</details>

<details>
    <summary><h1>DTABASE ERD</h1></summary>

![Database ERD - V1.0](images/ERD-v1.jpg)
</details>


<details>
    <summary><h1>API FUNCTIONS</h1></summary>
    
|MODULES|METHOD|ROUTE|PARAMS|OPTIONAL PARAMS|FUNCTION|DESCRIPTION|
|---|---|---|---|---|---|---|
|CATEGORIES|GET|/categories|||`getAllCategories`|Returns all categories|
| |GET|/categories/:categoryId|||`getCategory`|Returns one category|
| |POST|/categories|{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name:string<br>}||`newCategory`|Creates a new category and returns it|
| |PUT|/categories/:categoryId|{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name:string<br>}||`updateCategory`|Updates the name of a category|
| |DELETE|/categories/:categoryId|||`deleteCategory`|Deletes a category|
|ORDERS STATUS|GET|/ordersstatus|||`getAllStatus`|Returns all status for the orders|
| |GET|/ordersstatus/:ordersstatusId|||`getStatus`|Returns one status|
| |POST|/ordersstatus|{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name:string<br>}||`newStatus`|Creates a new order status and returns it|
| |PUT|/ordersstatus/:ordersstatusId|{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name:string<br>}||`updateStatus`|Updates the name of an order status|
| |DELETE|/ordersstatus/:ordersstatusId|||`deleteStatus`|Deletes an order status|
|USERS TYPE|GET|/usertypes|||`getAllUserTypes`|Returns all available user's type|
| |GET|/usertypes/:usertypesId|||`getUserType`|Returns one user type|
|SECTIONS|GET|/sections|||`getAllSections`|Returns all the sections|
| |GET|/sections/:sectionId|||`getSection`|Returns one section|
| |POST|/sections|{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name:string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;web:string<br>}||`newSection`|Creates a new section|
| |PUT|/sections/:sectionId||{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name:string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;web:string<br>}|`updateSection`|Updates the section according to the given params|
| |DELETE|/sections/:sectionId|||`deleteSection`|Deletes one section|
|USERS|GET|/users||{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type: integer, <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: string, <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastName:string, <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;email:string, <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;address:string<br>}|`getAllUsers`|Returns all users with optional filters|
| |POST|/users|{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type:integer,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name:string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastName:string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;email:string, <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;address:string<br>}||`newUser`|Creates a new user in the database and returns the user|
| |GET|/users/:userId|||`getUser`|Returns one user with its usertype|
| |PUT|/users/:userId||{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type:integer,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastName:string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;email:string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;address:string<br>}|`updateUser`|Updates user with the given params, leaving the rest as it was|
|PRODUCTS|GET|/products||{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name:string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;categoryId:integer,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order:string<br>}|`getAllProducts`|Returns all the products with its corresponding category and prices with its sections. Optional parameters are to determine filters and ordering|
| |GET|/products/:productId|||`getProduct`|Returns one product with its corresponding category and prices with its sections|
| |POST|/products|{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name:string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;categoryId:integer<br>}|{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;image:string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order:integer<br>}|`newProduct`|Creates a product. image:default.jpg, order:0 are passed as default values|
| |PUT|/products/:productId||{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name:string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;categoryId:integer,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;image:string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order:integer<br>}|`updateProduct`|Updates the product with the given params, leaving the rest as it was|
| |DELETE|/products/:productId|||`deleteProduct`|Deletes the product and its prices from productsprices|
| |POST|/products/prices/:productId|{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;price:float,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sectionId:integer<br>}|{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;concept:string<br>}|`newPrice`|Creates a new price for a product in a determined section. Optional set a concept for that price.|
| |PUT|/products/prices/:productpriceId||{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;price:float,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sectionId:integer,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;concept:string<br>}|`updatePrice`|Updates the price for a product by its ID in productprices|
| |DELETE|/products/prices/:productpriceId|||`deletePrice`|Deletes the corresponding productprice item|
|ORDERS|GET|/orders||{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;date_from:date,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;date_to:date,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;userId:integer,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ordersstatusesId:integer<br>}|`getAllOrders`|Returns all the orders with its users and products. Optional params for filters and order|
| |GET|/orders/:orderId|||`getOrder`|Returns one order with its user and products|
| |POST|/orders|{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;userId:integer<br>}|{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ordersstatusesId:integer,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;createdAt:date,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;updatedAt:date<br>}|`newOrder`|Creates an order. ordersstatusesId:1, createdAt:NOW(), updatedAt:NOW() are default values|
| |PUT|/orders/:orderId||{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;userId:integer,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ordersstatusesId:integer,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;createdAt:date,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;updatedAt:date<br>}|`updateFullOrder`|Only for the admins, for very parcticular cases|
| |PATCH|/orders/:orderId|{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ordersstatusesId:integer<br>}||`updateOrderStatus`|Updates the order status. field updatedAt by defauls changes to NOW()|
| |DELETE|/orders/:orderId|||`deleteOrder`|Deletes an order and the related ordersproducts|
| |GET|/orders/products/:orderId|||`getOrderProducts`|Returns only the products for an order|
| |POST|/orders/products/:orderId|{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;productId:integer,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;quantity:float<br>}||`newOrderProduct`|Adds a new product to the order with its quantity. The rest of the fields in ordersproducts are filled with the current product information|
| |PATCH|/orders/products/:orderproductId|{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;quantity:float<br>}||`updateOrderProductQuantity`|Updates only the quantity for a product related to an order|
| |DELETE|/orders/products/:orderproductId|||`deleteOrderProduct`|Removes a product from an order|

</details>
