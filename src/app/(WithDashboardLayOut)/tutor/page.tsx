const TutorPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-screen">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl  bg-neutral-300" />
        <div className="aspect-video rounded-xl  bg-neutral-300" />
        <div className="aspect-video rounded-xl bg-neutral-300" />
      </div>
      <div className="min-h-screen  rounded-xl flex-1 bg-neutral-300  md:min-h-min" />
    </div>
  );
};

export default TutorPage;
