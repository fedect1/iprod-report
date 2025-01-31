import React from 'react';

interface TitlePageProps {
  title: string;
}

const TitlePage: React.FC<TitlePageProps> = ({ title }) => {
  return (
    <div className="flex justify-center items-center h-10 my-3">
      <h1 className="text-3xl font-semibold text-black">{title}</h1>
    </div>
  );
};

export default TitlePage;
