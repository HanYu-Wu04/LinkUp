"use client";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { AiFillApple, AiFillFileImage } from "react-icons/ai";
import { useRef } from "react";

const ImageGridHero = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  return (
    <>
      <Nav scrollYProgress={scrollYProgress} />
      <section ref={targetRef} className="h-[350vh] bg-white">
        <div className="sticky top-0 z-0 grid h-screen grid-cols-3 grid-rows-3 gap-4 overflow-hidden p-4">
          <Copy scrollYProgress={scrollYProgress} />
          <Images scrollYProgress={scrollYProgress} />

          <Circles />
        </div>
      </section>

      <div className="flex h-screen items-center justify-center bg-violet-600 text-white">
        <span>Other content here {":)"}</span>
      </div>
    </>
  );
};

const Nav = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const background = useTransform(scrollYProgress, (i: number) => (i === 1 ? "rgb(13,10,9)" : "transparent"));

  return (
    <motion.nav
      style={{ background }}
      className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-4 py-2 transition-colors"
    >
      <div className="flex items-center gap-2 text-lg text-white">
        <AiFillFileImage className="text-xl" />
        <span className="font-bold">PIXII</span>
      </div>
      <button className="flex items-center gap-1.5 bg-white px-3 py-1.5 text-sm font-semibold text-black transition-opacity hover:opacity-90">
        <AiFillApple className="text-lg" />
        <span>Download</span>
      </button>
    </motion.nav>
  );
};

const Copy = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const copyScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.5]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.75], ["0%", "7.5%"]);

  return (
    <motion.div
      style={{
        scale: copyScale,
        opacity: copyOpacity,
        y: copyY,
      }}
      className="absolute z-20 flex h-screen w-full flex-col items-center justify-center px-8"
    >
      <h1 className="max-w-xl text-center text-5xl font-bold text-stone-950 md:text-7xl">Photo gallery for artists</h1>
      <p className="my-6 max-w-xl text-center text-sm text-stone-600 md:text-base">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo, minus nisi? Quod praesentium quaerat possimus.
      </p>
      <div className="flex items-center gap-4">
        <button className="bg-violet-600 px-4 py-2 font-medium text-white transition-colors hover:bg-violet-600">
          Try for free
        </button>
        <button className="bg-transparent px-4 py-2 font-medium text-stone-950 transition-colors hover:bg-stone-200">
          Learn about us
        </button>
      </div>
    </motion.div>
  );
};

const Images = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  const image1Offset = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);

  const image2OffsetX = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);
  const image2OffsetY = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  const image3OffsetX = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]);
  const image3OffsetY = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);

  const image4OffsetX = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);
  const image4OffsetY = useTransform(scrollYProgress, [0, 1], ["-145%", "0%"]);

  const image5OffsetX = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]);
  const image5OffsetY = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);

  const image6OffsetX = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);
  const image6OffsetY = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);

  return (
    <>
      <motion.div
        className="relative z-10 col-span-2"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1855&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale,
          x: image1Offset,
          y: image1Offset,
        }}
      />
      <motion.div
        className="relative z-10 row-span-2"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1517504734587-2890819debab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=607&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale,
          x: image2OffsetX,
          y: image2OffsetY,
        }}
      />

      <motion.div
        className="relative z-10 row-span-2"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1602294525148-c3d202338aa3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale,
          x: image3OffsetX,
          y: image3OffsetY,
        }}
      />
      <motion.div
        className="relative z-10"
        style={{
          backgroundImage:
            "url(https://plus.unsplash.com/premium_photo-1671751033625-46175f2eb03d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1624&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale,
          x: image4OffsetX,
          y: image4OffsetY,
        }}
      />

      <motion.div
        className="relative z-10"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1511800453077-8c0afa94175f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale,
          x: image5OffsetX,
          y: image5OffsetY,
        }}
      />
      <motion.div
        className="relative z-10"
        style={{
          backgroundImage:
            "url(https://plus.unsplash.com/premium_photo-1668790459004-780996a6404c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale,
          x: image6OffsetX,
          y: image6OffsetY,
        }}
      />
    </>
  );
};

const Circles = () => (
  <>
    <div className="absolute left-0 top-0 z-0 aspect-square w-3/5 min-w-[400px] max-w-[850px] -translate-x-[50%] -translate-y-[50%] rounded-full border-[8px] border-slate-200" />
    <div className="absolute bottom-0 right-0 z-0 aspect-square w-1/2 min-w-[300px] max-w-[600px] translate-x-[50%] translate-y-[50%] rounded-full border-[8px] border-slate-200" />
  </>
);

export default ImageGridHero;
