import React from 'react';

export default function AppFooter() {
  return (
    <footer className="border-t border-black/5 py-5 mt-auto">
      <small className="opacity-80">
        &copy; {new Date().getFullYear()} PetCare App by DArlegui. All rights reserved.{' '}
      </small>
    </footer>
  );
}
