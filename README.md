# User Authentication API

A secure, scalable REST API for user authentication and authorization. This backend handles user registration, secure password hashing, session management via JWT (JSON Web Tokens), and protected route middleware.

## Features

- **User Registration & Login:** Secure onboarding and authentication flow.
- **Password Hashing:** Passwords securely hashed using bcrypt before database storage.
- **JWT Authorization:** Token-based stateless authentication with expiration.
- **Route Protection:** Custom middleware to restrict access to authenticated users only.
- **Input Validation:** Strict request body validation to prevent malicious data injection.

---

## Tech Stack

- **Runtime Environment:** Node.js (or Python / Go)
- **Framework:** Express.js (or Django / FastAPI)
- **Database:** MongoDB with Mongoose (or PostgreSQL)
- **Authentication:** JSON Web Tokens (JWT) & Bcrypt

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:
- Node.js (v18.0.0 or higher)
- MongoDB (Local instance or Atlas cloud cluster)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/piratefalcon8/userAuth.git](https://github.com/piratefalcon8/userAuth.git)
   cd userAuth# userAuth
