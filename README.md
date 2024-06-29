# [WanderLust](https://hotelwebsite-production.up.railway.app/listings)

WanderLust is a comprehensive travel listing and review platform designed to connect travelers with unique accommodations worldwide. Built with Node.js and Express.js on the backend, and MongoDB for data storage via Mongoose, WanderLust offers a seamless user experience for managing and discovering travel listings.

## Key Features

- **User Authentication:** Secure authentication system using Passport.js, allowing users to sign up, log in, and log out.
- **Listing Management:** Create, read, update, and delete (CRUD) operations for travel listings, including descriptions, images, pricing, and location details.
- **Review System:** Users can leave reviews with ratings for listings they have visited, contributing to an informed decision-making process for other users.
- **Authorization:** Different levels of access control ensure only authorized users can perform actions such as updating or deleting listings and reviews.
- **Image Upload:** Integration with Cloudinary for seamless image upload functionality when creating or updating listings.
- **Flash Messages:** Informative messages displayed to users based on their actions or errors encountered, enhancing user interaction and feedback.
- **Responsive Design:** Mobile-friendly interface using Bootstrap 5, ensuring a consistent and optimal experience across devices.
- **SEO Friendly:** Optimized for search engines with meta tags, title tags, and structured data, improving visibility and discoverability.

## Technologies Used

### Frontend

-   **HTML5** and **CSS3**: Markup and styling languages for structuring
    and designing the user interface.

-   **Bootstrap 5**: Frontend component library for responsive and
    mobile-first design.

-   **JavaScript (ES6+)**: Programming language for frontend
    interactivity and dynamic behavior.

-   **EJS (Embedded JavaScript)**: Templating language for generating
    HTML markup with JavaScript.

### Backend

-   **Node.js**: Backend runtime environment for executing JavaScript
    code.

-   **Express.js**: Web framework for Node.js used to build robust APIs
    and web applications.

### Database

-   **MongoDB**: NoSQL database for storing application data.

-   **Mongoose**: MongoDB object modeling tool for Node.js, providing
    schema-based modeling for application data.

### Authentication

-   **Passport.js**: Authentication middleware for Node.js, facilitating
    user authentication strategies.

### Image Storage

-   **Cloudinary**: Cloud-based image and video management service used
    for storing, managing, and delivering images.

### Deployment

-   **Railway**: Cloud platform used for deploying, managing, and scaling
    applications. [visit](https://hotelwebsite-production.up.railway.app/listings)


## Installation

1.  Clone the repository:

```
git clone https://github.com/PutluruAravindaReddy/Hotel_website.git

```

2.  Install dependencies:

```
npm install
```
3.  Set up environment variables:

    -   Create a .env file in the root directory.

    -   Add environment-specific variables such as PORT, ATLASDB_URL,
        CLOUD_NAME, CLOUD_API_KEY, and CLOUD_API_SECRET_KEY.

4.  Start the server:

```
node app.js
```
## Usage

1.  Register and login to the WanderLust platform.

2.  Explore listings, read reviews, and add your own listings.

3.  Leave reviews for listings you have experienced.

4.  Manage your listings and account settings.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.

2.  Create your feature branch:

```
git checkout -b feature/NewFeature
```


3.  Commit your changes:

```
git commit -am \'Add some feature\'
```

4.  Push to the branch:

```
git push origin feature/NewFeature
```

5.  Submit a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

-   [Bootstrap](https://getbootstrap.com/) - Front-end component
    library.

-   [Cloudinary](https://cloudinary.com/) - Cloud-based image and video
    management service.

-   [Font Awesome](https://fontawesome.com/) - Icon toolkit.

## Contact

For questions or feedback, please contact aravindareddy60@example.com.
