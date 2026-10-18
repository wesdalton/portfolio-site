export default function StructuredData() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Wesley Dalton',
    jobTitle: 'Software Engineer',
    description:
      'Software engineer studying Computer Science and History at the University of Pennsylvania, with experience in AI evaluation, autonomy, and product engineering.',
    url: 'https://wesleydalton.com',
    sameAs: [
      'https://linkedin.com/in/wesley-dalton',
      'https://github.com/wesdalton',
    ],
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: 'University of Pennsylvania',
    },
    knowsAbout: [
      'Software Engineering',
      'AI Evaluation',
      'Autonomous Systems',
      'Python',
      'C++',
      'TypeScript',
      'Swift',
    ],
    email: 'wdalton@engineering.upenn.edu',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
    />
  );
}
