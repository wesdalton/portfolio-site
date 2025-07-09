export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Wesley Dalton",
    "jobTitle": "Software Engineer",
    "description": "Computer Science major at University of Pennsylvania with experience in AI, machine learning, and software engineering",
    "url": "https://wesleydalton.com",
    "sameAs": [
      "https://linkedin.com/in/wesley-dalton",
      "https://github.com/wesdalton"
    ],
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "University of Pennsylvania",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Philadelphia",
        "addressRegion": "PA",
        "addressCountry": "US"
      }
    },
    "worksFor": [
      {
        "@type": "Organization",
        "name": "TRAK",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "New York",
          "addressRegion": "NY",
          "addressCountry": "US"
        }
      }
    ],
    "knowsAbout": [
      "Python",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Machine Learning",
      "Artificial Intelligence",
      "Software Engineering",
      "Full Stack Development"
    ],
    "email": "wdalton@seas.upenn.edu",
    "telephone": "(917) 572-1803",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Philadelphia",
      "addressRegion": "PA",
      "addressCountry": "US"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}