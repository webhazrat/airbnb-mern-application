import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="px-5 py-5 max-w-6xl mx-auto">
      <h1 className="text-xl font-medium mb-5">
        We can’t seem to find the page you’re looking for
      </h1>
      <p className="mb-2">Here are some helpful links instead:</p>
      <nav className="space-y-2">
        <div>
          <Link
            to={`/`}
            className="underline inline-block transition-all hover:text-primary"
          >
            Home
          </Link>
        </div>
        <div>
          <Link
            to={`/login`}
            className="underline inline-block transition-all hover:text-primary"
          >
            Login
          </Link>
        </div>
        <div>
          <Link
            to={`/register`}
            className="underline inline-block transition-all hover:text-primary"
          >
            Register
          </Link>
        </div>
        <div>
          <Link
            to={`/account`}
            className="underline inline-block transition-all hover:text-primary"
          >
            My Account
          </Link>
        </div>
      </nav>
    </div>
  );
};
export default NotFoundPage;
