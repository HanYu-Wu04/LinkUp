"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const CARD_SIZE_LG = 365;
const CARD_SIZE_SM = 290;

const BORDER_SIZE = 2;
const CORNER_CLIP = 50;
const CORNER_LINE_LEN = Math.sqrt(CORNER_CLIP * CORNER_CLIP + CORNER_CLIP * CORNER_CLIP);

const ROTATE_DEG = 2.5;

const STAGGER = 15;
const CENTER_STAGGER = -65;

const SECTION_HEIGHT = 600;

export default function Testimonials() {
  const [cardSize, setCardSize] = useState(CARD_SIZE_LG);

  const [testimonials, setTestimonials] = useState(TESTIMONIAL_DATA);

  const handleMove = (position: number) => {
    const copy = [...testimonials];

    if (position > 0) {
      for (let i = position; i > 0; i--) {
        const firstEl = copy.shift();

        if (!firstEl) return;

        copy.push({ ...firstEl, tempId: Math.random() });
      }
    } else {
      for (let i = position; i < 0; i++) {
        const lastEl = copy.pop();

        if (!lastEl) return;

        copy.unshift({ ...lastEl, tempId: Math.random() });
      }
    }

    setTestimonials(copy);
  };

  useEffect(() => {
    const { matches } = window.matchMedia("(min-width: 640px)");

    if (matches) {
      setCardSize(CARD_SIZE_LG);
    } else {
      setCardSize(CARD_SIZE_SM);
    }

    const handleSetCardSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");

      if (matches) {
        setCardSize(CARD_SIZE_LG);
      } else {
        setCardSize(CARD_SIZE_SM);
      }
    };

    window.addEventListener("resize", handleSetCardSize);

    return () => window.removeEventListener("resize", handleSetCardSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-white"
      style={{
        height: SECTION_HEIGHT,
      }}
    >
      {testimonials.map((t, idx) => {
        let position = 0;

        if (testimonials.length % 2) {
          position = idx - (testimonials.length + 1) / 2;
        } else {
          position = idx - testimonials.length / 2;
        }

        return (
          <TestimonialCard
            key={t.tempId}
            testimonial={t}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-8">
        <button
          onClick={() => handleMove(-1)}
          className="grid h-14 w-14 place-content-center text-3xl text-black transition-colors hover:bg-black hover:text-white"
        >
          <GoArrowLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="grid h-14 w-14 place-content-center text-3xl text-black transition-colors hover:bg-black hover:text-white"
        >
          <GoArrowRight />
        </button>
      </div>
    </div>
  );
}

interface TestimonialProps {
  position: number;
  testimonial: TestimonialType;
  handleMove: Function;
  cardSize: number;
}

const TestimonialCard = ({ position, testimonial, handleMove, cardSize }: TestimonialProps) => {
  const isActive = position === 0;

  return (
    <motion.div
      initial={false}
      onClick={() => handleMove(position)}
      className={`
      absolute left-1/2 top-1/2 cursor-pointer border-black p-8 text-black transition-colors duration-500 ${
        isActive ? "z-10 bg-blue-200" : "z-0 bg-white"
      }
      `}
      style={{
        borderWidth: BORDER_SIZE,
        clipPath: `polygon(${CORNER_CLIP}px 0%, calc(100% - ${CORNER_CLIP}px) 0%, 100% ${CORNER_CLIP}px, 100% 100%, calc(100% - ${CORNER_CLIP}px) 100%, ${CORNER_CLIP}px 100%, 0 100%, 0 0)`,
      }}
      animate={{
        width: cardSize,
        height: cardSize,
        x: `calc(-50% + ${position * (cardSize / 1.5)}px)`,
        y: `calc(-50% + ${isActive ? CENTER_STAGGER : position % 2 ? STAGGER : -STAGGER}px)`,
        rotate: isActive ? 0 : position % 2 ? ROTATE_DEG : -ROTATE_DEG,
        boxShadow: isActive ? "0px 8px 0px 4px black" : "0px 0px 0px 0px black",
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-black object-cover"
        style={{
          right: -BORDER_SIZE,
          top: CORNER_CLIP - BORDER_SIZE,
          width: CORNER_LINE_LEN,
          height: BORDER_SIZE,
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={`Testimonial image for ${testimonial.by}`}
        className="mb-4 h-14 w-12 bg-neutral-600 object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px white",
        }}
      />
      <h3 className={`text-base sm:text-xl ${isActive ? "text-blue-600" : "text-black"}`}>
        &apos;{testimonial.testimonial}&apos;
      </h3>
      <p
        className={`absolute bottom-8 left-8 right-8 mt-2 text-sm italic ${
          isActive ? "text-blue-600" : "text-neutral-700"
        }`}
      >
        - {testimonial.by}
      </p>
    </motion.div>
  );
};

type TestimonialType = {
  tempId: number;
  testimonial: string;
  by: string;
  imgSrc: string;
};

const TESTIMONIAL_DATA: TestimonialType[] = [
  {
    tempId: 0,
    testimonial:
      "I found an amazing soccer group through LinkUp! It was super easy to join, and now I play every weekend with great teammates.",
    by: "Brandon, Soccer Enthusiast",
    imgSrc:
      "https://media.licdn.com/dms/image/v2/C5603AQGTddrxALrfeg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1661658384855?e=1743033600&v=beta&t=RoJJUlI65cfJCEgl3cR1ZuQ7UDHDV1Xn6i-4Dp747os",
  },
  {
    tempId: 1,
    testimonial:
      "Thanks to LinkUp, I joined a basketball group that plays every Friday. I've made so many new friends through this app!",
    by: "Hanyu, Basketball Player",
    imgSrc:
      "https://media.licdn.com/dms/image/v2/D5603AQFO3nOwW4doDQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1706056645381?e=2147483647&v=beta&t=IRbQo-PIgK2fHgzPHMEFsUdls3J3OBChM2BOdBY0Tew",
  },
  {
    tempId: 2,
    testimonial:
      "I was new to town and looking for a tennis group. LinkUp helped me find one quickly, and I’ve been playing ever since!",
    by: "Jesus, Tennis Player",
    imgSrc:
      "https://images.ctfassets.net/zuhqmf1mxpuu/52SC9d3d7mXLOd2SkZYY3z/6a9d5a5dafc1f2a49a511a4fce8beaa9/avatar_-_Jesus_Avalos.jpg?w=400&fm=webp",
  },
  {
    tempId: 3,
    testimonial:
      "The app is so user-friendly. I joined a hiking group, and it’s been a great way to stay active and meet like-minded people.",
    by: "Shuya, Outdoor Enthusiast",
    imgSrc:
      "https://media.licdn.com/dms/image/v2/D5603AQHQxdwOWehcLw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1729202861551?e=1743033600&v=beta&t=KhN1HZt6UJ4Lz34L8zF-2Gu7RC7atxgjHKouCNJj6-Q",
  },
  {
    tempId: 4,
    testimonial:
      "I love how easy it is to find groups for any sport! I joined a volleyball league through LinkUp, and it’s been so much fun.",
    by: "Vasanth, Volleyball Player",
    imgSrc:
      "https://media.licdn.com/dms/image/v2/D5622AQH6FZmsMcHiYQ/feedshare-shrink_800/feedshare-shrink_800/0/1713674158639?e=2147483647&v=beta&t=jINTKkP0t7nmLT99bcGsocFK4ka7Nmh6pe6cxI7PMFE",
  },
  {
    tempId: 5,
    testimonial:
      "Joining a running group was effortless. It’s amazing how LinkUp brings people together over shared interests.",
    by: "Brian, Marathon Runner",
    imgSrc:
      "https://media.licdn.com/dms/image/v2/D5603AQGxQfCu0vWFFg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1719199588580?e=2147483647&v=beta&t=QodlIPWeCgs5ISFL3fMwUs9T6geouof4189IPyn2pUY",
  },
  {
    tempId: 6,
    testimonial:
      "LinkUp made it so simple to organize a badminton group. We’ve grown to over 20 players, and it’s all thanks to this app!",
    by: "Muzart, Badminton Organizer",
    imgSrc:
      "https://media.licdn.com/dms/image/v2/D5603AQG-7wn29-2IAw/profile-displayphoto-shrink_800_800/B56ZR9jPfkGQAc-/0/1737273178747?e=1743033600&v=beta&t=zACAork8U0nIzIpXz5gIKRAb5_MgjxAX7De-U57_vZA",
  },
  {
    tempId: 7,
    testimonial:
      "I found a friendly group to play pickup basketball after work. LinkUp made it so easy to connect with others nearby.",
    by: "Gi-Hun, Basketball Enthusiast",
    imgSrc: "https://upload.wikimedia.org/wikipedia/en/c/c1/Seong_Gi-hun_season_1.png",
  },
  {
    tempId: 8,
    testimonial:
      "As a salesperson, I’m always on the move. LinkUp helped me find a local soccer team I can play with when I’m in town.",
    by: "Gong Yoo, Soccer Player",
    imgSrc:
      "https://static1.srcdn.com/wordpress/wp-content/uploads/2022/11/Gong-Yoo-as-The-Salesman-in-Squid-Game-(2021).JPG",
  },
  {
    tempId: 9,
    testimonial:
      "LinkUp is fantastic for finding local sports groups. I even joined a cricket league, and it’s been the highlight of my weekends!",
    by: "Dababy, Cricket Player",
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_9ogi70cb7pjHyc9zToJk6Hvxnqu3EqXpkq3ZWTHlW_4Sg-bEUafLh_4tfMynzLFON-DaCxawoB-sqiYtoTlaeQ",
  },
  {
    tempId: 9,
    testimonial:
      "LinkUp is fantastic for finding local sports groups. I even joined a cricket league, and it’s been the highlight of my weekends!",
    by: "Dababy, Cricket Player",
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_9ogi70cb7pjHyc9zToJk6Hvxnqu3EqXpkq3ZWTHlW_4Sg-bEUafLh_4tfMynzLFON-DaCxawoB-sqiYtoTlaeQ",
  },
  {
    tempId: 10,
    testimonial: "I was able to find people to eat my delicious icecream with! I love eating icecream!",
    by: "Joe, Former US President",
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFgTo_0PMYVqpRn3OaXXFlh3Hh5YgfND5N4g&s",
  },
  {
    tempId: 11,
    testimonial:
      "I was able to find people to do reaction videos with and people to help me film some really fun and exciting YouTube videos!",
    by: "KSI, YouTuber",
    imgSrc:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQbTAsbPTZfiGcYouMuKTsI4-0SqDztM_w3YdAj_wsOAoSHvRRJPhorCzd-eIgX4bw1Ba82hd0LP7T4nDOna10d5A",
  },
];
