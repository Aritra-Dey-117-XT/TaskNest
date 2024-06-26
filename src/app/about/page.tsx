// pages/about.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import myPicture from '../../../public/me.jpg';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <header className="flex justify-end mb-8">
        <Link href="/">
          <p className="text-lg text-blue-600 hover:underline hover:text-green-500">Go To Home</p>
        </Link>
      </header>
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-center mb-6 animate-fade-in">About TaskNext</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
        TaskNest is a To-Do List and productivity application built on <a className="font-bold text-blue-600 hover:text-blue-800" href="https://secura-auth.vercel.app" target='_blank'>Secura_Auth</a>, leveraging Next.js 14 and MongoDB for robust task management and collaboration. TaskNest ensures secure task organization with advanced data encryption techniques and non-alien authentication methods, ensuring independence from third-party strategies like Google or GitHub. It features alert email notifications for tasks, enhancing productivity and timely task management. With TaskNest, prioritize efficiency and security in managing your daily tasks and projects.
        </p>
      </section>

      <section className="mb-12">
        <h1 className="text-4xl font-bold text-center mb-6 animate-fade-in">About Me</h1>
        <div className="flex flex-col items-center">
          <Image
            src={myPicture}
            alt="Aritra Dey"
            className="rounded-full w-48 h-48 mb-6 shadow-lg"
          />
          <p className="text-lg text-gray-400 leading-relaxed text-center">
          I am Aritra Dey, a dedicated web development enthusiast currently studying at IIIT Kalyani, an INI in West Bengal, India. My passion lies in creating robust and secure web applications that enhance user experience and efficiency. TaskNest, built on the secure foundation of <a className="font-bold text-blue-600 hover:text-blue-800" href="https://secura-auth.vercel.app" target='_blank'>Secura_Auth</a> and utilizing Next.js 14 and MongoDB, represents my commitment to developing innovative solutions.
          </p>
          <div className="flex justify-center mt-6 space-x-4">
            <Link href="https://linkedin.com/in/aritra-dey-14369b270" target="_blank" rel="noopener noreferrer">
              <p className="svg-icon" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.795-1.75-1.732s.784-1.732 1.75-1.732c.966 0 1.75.795 1.75 1.732s-.784 1.732-1.75 1.732zm13.5 12.268h-3v-5.604c0-1.334-.027-3.053-1.865-3.053-1.867 0-2.154 1.457-2.154 2.961v5.696h-3v-11h2.884v1.501h.041c.401-.759 1.379-1.561 2.835-1.561 3.029 0 3.591 1.994 3.591 4.585v6.475z"/>
                </svg>
              </p>
            </Link>
            <Link href="https://github.com/Aritra-Dey-117-XT" target="_blank" rel="noopener noreferrer">
              <p className="svg-icon" aria-label="GitHub">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.086-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.997.108-.775.418-1.305.76-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.467-2.382 1.236-3.222-.124-.304-.535-1.527.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.005-.404 1.022.005 2.048.138 3.006.404 2.291-1.552 3.298-1.23 3.298-1.23.653 1.649.242 2.872.118 3.176.77.84 1.236 1.912 1.236 3.222 0 4.61-2.804 5.624-5.476 5.921.43.371.812 1.102.812 2.222 0 1.606-.014 2.898-.014 3.293 0 .32.218.694.825.576 4.765-1.589 8.201-6.086 8.201-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </p>
            </Link>
            <Link href="https://x.com/Arivenger117" target="_blank" rel="noopener noreferrer">
              <p className="svg-icon" aria-label="X">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
                <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
                </svg>
              </p>
            </Link>
            <Link href="mailto:aritradey2715@gmail.com" target="_blank" rel="noopener noreferrer">
              <p className="svg-icon" aria-label="Gmail">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12 13.065l-12-7.065v13c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-13l-12 7.065zm12-10.065v-.935c0-1.104-.896-2-2-2h-20c-1.104 0-2 .896-2 2v.935l12 7.065 12-7.065z"/>
                </svg>
              </p>
            </Link>
            <Link href="https://www.instagram.com/arivenger11747/" target="_blank" rel="noopener noreferrer">
              <p className="svg-icon" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.17.054 1.97.24 2.417.406a4.92 4.92 0 0 1 1.754 1.022 4.92 4.92 0 0 1 1.022 1.754c.166.447.352 1.247.406 2.417.058 1.265.069 1.645.069 4.849 0 3.204-.012 3.584-.07 4.849-.054 1.17-.24 1.97-.406 2.417a4.908 4.908 0 0 1-1.022 1.754 4.922 4.922 0 0 1-1.754 1.022c-.447.166-1.247.352-2.417.406-1.265.058-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.07-1.17-.054-1.97-.24-2.417-.406a4.92 4.92 0 0 1-1.754-1.022 4.92 4.92 0 0 1-1.022-1.754c-.166-.447-.352-1.247-.406-2.417-.058-1.265-.069-1.645-.069-4.849 0-3.204.012-3.584.07-4.849.054-1.17.24-1.97.406-2.417a4.92 4.92 0 0 1 1.022-1.754 4.92 4.92 0 0 1 1.754-1.022c.447-.166 1.247-.352 2.417-.406 1.265-.058 1.645-.069 4.849-.069zm0-2.163c-3.261 0-3.667.012-4.947.071-1.28.059-2.162.26-2.918.555a6.92 6.92 0 0 0-2.519 1.641 6.923 6.923 0 0 0-1.641 2.519c-.295.756-.496 1.638-.555 2.918-.059 1.28-.071 1.686-.071 4.947s.012 3.667.071 4.947c.059 1.28.26 2.162.555 2.918a6.92 6.92 0 0 0 1.641 2.519 6.92 6.92 0 0 0 2.519 1.641c.756.295 1.638.496 2.918.555 1.28.059 1.686.071 4.947.071s3.667-.012 4.947-.071c1.28-.059 2.162-.26 2.918-.555a6.922 6.922 0 0 0 2.519-1.641 6.92 6.92 0 0 0 1.641-2.519c.295-.756.496-1.638.555-2.918.059-1.28.071-1.686.071-4.947s-.012-3.667-.071-4.947c-.059-1.28-.26-2.162-.555-2.918a6.92 6.92 0 0 0-1.641-2.519 6.92 6.92 0 0 0-2.519-1.641c-.756-.295-1.638-.496-2.918-.555-1.28-.059-1.686-.071-4.947-.071zm0 5.838a6.163 6.163 0 1 0 0 12.327 6.163 6.163 0 0 0 0-12.327zm0 10.327a4.163 4.163 0 1 1 0-8.327 4.163 4.163 0 0 1 0 8.327zm6.406-11.845a1.44 1.44 0 1 1 0-2.881 1.44 1.44 0 0 1 0 2.881z"/>
                </svg>
              </p>
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=100071247902105" target="_blank" rel="noopener noreferrer">
              <p className="svg-icon" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="3.5 3.5 51 51">
                  <path d="M 25 3 C 12.861562 3 3 12.861562 3 25 C 3 36.019135 11.127533 45.138355 21.712891 46.728516 L 22.861328 46.902344 L 22.861328 29.566406 L 17.664062 29.566406 L 17.664062 26.046875 L 22.861328 26.046875 L 22.861328 21.373047 C 22.861328 18.494965 23.551973 16.599417 24.695312 15.410156 C 25.838652 14.220896 27.528004 13.621094 29.878906 13.621094 C 31.758714 13.621094 32.490022 13.734993 33.185547 13.820312 L 33.185547 16.701172 L 30.738281 16.701172 C 29.349697 16.701172 28.210449 17.475903 27.619141 18.507812 C 27.027832 19.539724 26.84375 20.771816 26.84375 22.027344 L 26.84375 26.044922 L 32.966797 26.044922 L 32.421875 29.564453 L 26.84375 29.564453 L 26.84375 46.929688 L 27.978516 46.775391 C 38.71434 45.319366 47 36.126845 47 25 C 47 12.861562 37.138438 3 25 3 z M 25 5 C 36.057562 5 45 13.942438 45 25 C 45 34.729791 38.035799 42.731796 28.84375 44.533203 L 28.84375 31.564453 L 34.136719 31.564453 L 35.298828 24.044922 L 28.84375 24.044922 L 28.84375 22.027344 C 28.84375 20.989871 29.033574 20.060293 29.353516 19.501953 C 29.673457 18.943614 29.981865 18.701172 30.738281 18.701172 L 35.185547 18.701172 L 35.185547 12.009766 L 34.318359 11.892578 C 33.718567 11.811418 32.349197 11.621094 29.878906 11.621094 C 27.175808 11.621094 24.855567 12.357448 23.253906 14.023438 C 21.652246 15.689426 20.861328 18.170128 20.861328 21.373047 L 20.861328 24.046875 L 15.664062 24.046875 L 15.664062 31.566406 L 20.861328 31.566406 L 20.861328 44.470703 C 11.816995 42.554813 5 34.624447 5 25 C 5 13.942438 13.942438 5 25 5 z"></path>
                </svg>
              </p>
            </Link>

          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
