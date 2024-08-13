import dynamic from "next/dynamic";
import { useMemo } from "react";

export default async function Page() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map/"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    [],
  );

  return (
    <>
      <div className="bg-white-700 mx-auto my-5 h-screen w-full">
        <Map posix={[29.696408, 52.457081]} />
      </div>
    </>
  );
}
