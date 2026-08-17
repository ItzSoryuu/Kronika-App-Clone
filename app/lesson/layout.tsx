type Props = {
  children: React.ReactNode;
};

// Layout khusus untuk halaman lesson (full height)
const LessonLayout = ({ children }: Props) => {
  return ( 
    <div className="flex flex-col h-full">
      <div className="flex flex-col h-full w-full">
        {children}
      </div>
    </div>
  );
};
 
export default LessonLayout;
