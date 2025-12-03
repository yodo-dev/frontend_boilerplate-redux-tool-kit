import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="primary"
            onClick={() => navigate(-1)}
            size="lg"
          >
            Go Back
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            size="lg"
          >
            Go Home
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Quick Links:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Home
            </Link>
            <Link to="/about" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              About
            </Link>
            <Link to="/contact" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Contact
            </Link>
            <Link to="/login" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

