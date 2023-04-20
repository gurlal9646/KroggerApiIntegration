As part of the project, I was responsible for implementing the products page on the application. To achieve this, I utilized the product list API from the Kroger developer API. I passed in the location ID for the store as well as the category of the products to display on the UI.

In addition, I added filters to the page to enable users to search for products based on their name or category. This allowed for a more user-friendly and intuitive shopping experience for customers.

The Products.js defines three functions:

# getToken:
This function sends a POST request to Kroger's OAuth2 endpoint to obtain an access token using the provided client ID and client secret. The access token is returned as a string.

# getProducts: 
This function sends a GET request to Kroger's API to retrieve a list of products matching a given product name and location ID. The function takes an access token as an argument, which is used to authenticate the request. The response is expected to be a JSON object containing an array of products, which is extracted and returned.

# renderProducts:
 This function takes an optional filter term as an argument and renders the list of products obtained from the getProducts function. The function loops through the products and generates HTML for each product, including its image, brand, description, and other details. If a filter term is provided, only products whose description contains the term are displayed.

The code also defines some variables, such as clientId and clientSecret, which are used to authenticate the OAuth2 request. locationId and productName are used to specify the location and name of the products to retrieve. products is an array that stores the products obtained from the API.

Finally, the code defines an event listener that calls the loadProducts function when the page has finished loading. The loadProducts function obtains an access token using the getToken function and then retrieves the list of products using the getProducts function. The renderProducts function is then called to display the products on the webpage.