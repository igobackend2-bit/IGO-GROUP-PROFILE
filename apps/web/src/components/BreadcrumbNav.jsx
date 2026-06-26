
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

function BreadcrumbNav() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-sm text-muted-foreground">
      <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
        <Home className="w-4 h-4" />
        <span className="sr-only">Home</span>
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');

        return (
          <React.Fragment key={name}>
            <ChevronRight className="w-4 h-4 mx-1 opacity-50" />
            {isLast ? (
              <span className="font-medium text-foreground" aria-current="page">
                {displayName}
              </span>
            ) : (
              <Link to={routeTo} className="hover:text-primary transition-colors">
                {displayName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export default BreadcrumbNav;
