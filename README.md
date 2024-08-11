# NewsHub

NewsHub is a full-featured application for managing articles. It includes functionalities for creating, updating, and deleting articles, as well as viewing a list of articles and their details. This project utilizes modern technologies such as Django, React, and TypeScript to deliver a robust and user-friendly experience.

## Features

- **CRUD Operations:** Create, read, update, and delete articles.
- **Pagination:** Navigate through pages of articles.
- **Search and Filtering:** Search articles by title and filter based on publication date.
- **Admin Panel:** Manage articles with a user-friendly admin interface.
- **Responsive Design:** Adaptable layout for various screen sizes.

## Technologies

- **Backend:**
  - Django
  - Django Rest Framework (DRF)
  - JWT Authentication
  - PostgreSQL or SQLite

- **Frontend:**
  - Next.js with TypeScript
  - React Hook Form for form management
  - React Query for data fetching and caching
  - React Bootstrap for UI components
  - CSS Modules for styling

- **DevOps:**
  - Docker for containerization
  - AWS for deployment
  - GitHub Actions for CI/CD

## Installation

To get started with NewsHub, follow these steps:

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/newshub.git
    cd newshub
    ```

2. Navigate to the backend directory and set up a virtual environment:

    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Apply database migrations:

    ```bash
    python manage.py migrate
    ```

5. Create a superuser for admin access:

    ```bash
    python manage.py createsuperuser
    ```

6. Run the development server:

    ```bash
    python manage.py runserver
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd ../frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

## Configuration

- **API Base URL:** Set `NEXT_PUBLIC_API_BASE_URL` in a `.env.local` file in the `frontend` directory.

    ```env
    NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/
    ```

- **Database Configuration:** Update `DATABASES` settings in `backend/settings.py` for your preferred database.

## Usage

1 BackEnd

	1.	Create a .env file in the root directory of the project.
  2.	Add the necessary local environment variables to the .env file. Example:

    	DATABASE_URL='your-database-url'
      SECRET_KEY='your-secret-key'
      REDIS_URL='your-redis-url'
  3. pip install -r requirements.txt
  4. Apply Migrations:
     python manage.py makemigrations
     python manage.py migrate
  5. redis-server
  6. Start Celery:
     celery -A your_project worker --loglevel=info
  7. Start Celery Beat
     celery -A your_project beat --loglevel=info
  8. Run Server:
     python manage.py runserver
     
2 FrontEnd
   1. Set local varible to .env.local
   2. Install Dependencies:
       npm install
   4. Run the Scrip:
        npm run dev


Access the application at `http://localhost:3000` for the frontend and `http://localhost:8000` for the backend API.
Use the admin panel at `http://localhost:8000/admin` to manage articles.

## Testing

- **Backend Tests:** Run tests with:

    ```bash
    python manage.py test
    ```

- **Frontend Tests:** Run tests with:

    ```bash
    npm test
    ```

## Deployment

To deploy NewsHub, you can use Docker and AWS. Follow the instructions in the `Dockerfile` and `docker-compose.yml` files for containerization and deployment.

1. Build the Docker image:

    ```bash
    docker build -t newshub .
    ```

2. Run the container:

    ```bash
    docker run -p 8000:8000 newshub
    ```

## Contributing

We welcome contributions to NewsHub! To contribute:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature
    ```
3. Make your changes and commit them:
    ```bash
    git add .
    git commit -m "Add your message here"
    ```
4. Push to your branch:
    ```bash
    git push origin feature/your-feature
    ```
5. Create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, please contact [your-email@example.com](mailto:your-email@example.com).

---

Thank you for using NewsHub!
