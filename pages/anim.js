import React from "react";
import { motion,useScroll,useSpring  } from "framer-motion";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
   
   

  return {
    props: {
     
    }, // will be passed to the page component as props
  };
}


export default function anim() {
    let {scrollYProgress }=useScroll ()
  
  return (
    <div>
      <motion.div style={{scaleX:scrollYProgress}} className=" bg-orange-500 p-2  w-full top-0 fixed z-50">
          
      </motion.div>
   
      <motion.div  className="w-full flex">
        <img
          className="w-6/12 object-cover"
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2FyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        ></img>
        <div className="w-6/12 flex items-center flex-col text-left p-5  border justify-start">
          <h1 className="text-3xl text-left">This is heading</h1>
          <p clasname='p-5'>
            How to create scroll-linked and scroll-triggered animations in
            Framer Motion. There are two predominant types of scroll animations,
            both of which can be achieved with Framer Motion. Scroll-linked
            animations are when the progress of an animation is directly tied to
            scroll progress. Scroll-triggered animations are when a normal
            animation is triggered when an element enters or leaves the
            viewport.How to create scroll-linked and scroll-triggered animations
            in Framer Motion. There are two predominant types of scroll
            animations, both of which can be achieved with Framer Motion.
            Scroll-linked animations are when the progress of an animation is
            directly tied to scroll progress. Scroll-triggered animations are
            when a normal animation is triggered when an element enters or
            leaves the viewport.How to create scroll-linked and scroll-triggered
            animations in Framer Motion. There are two predominant types of
            scroll animations, both of which can be achieved with Framer Motion.
            Scroll-linked animations are when the progress of an animation is
            directly tied to scroll progress. Scroll-triggered animations are
            when a normal animation is triggered when an element enters or
            leaves the viewport.
          </p>
        </div>
      </motion.div>
      <motion.div whileInView={{opacity:1}} initial={{opacity:0}} animate={{opacity:1}} className="w-full flex">
        <img
          className="w-6/12 object-cover"
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2FyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        ></img>
        <div className="w-6/12 flex items-center flex-col text-left p-5  border justify-start">
          <h1 className="text-3xl text-left">This is heading</h1>
          <p clasname='p-5'>
            How to create scroll-linked and scroll-triggered animations in
            Framer Motion. There are two predominant types of scroll animations,
            both of which can be achieved with Framer Motion. Scroll-linked
            animations are when the progress of an animation is directly tied to
            scroll progress. Scroll-triggered animations are when a normal
            animation is triggered when an element enters or leaves the
            viewport.How to create scroll-linked and scroll-triggered animations
            in Framer Motion. There are two predominant types of scroll
            animations, both of which can be achieved with Framer Motion.
            Scroll-linked animations are when the progress of an animation is
            directly tied to scroll progress. Scroll-triggered animations are
            when a normal animation is triggered when an element enters or
            leaves the viewport.How to create scroll-linked and scroll-triggered
            animations in Framer Motion. There are two predominant types of
            scroll animations, both of which can be achieved with Framer Motion.
            Scroll-linked animations are when the progress of an animation is
            directly tied to scroll progress. Scroll-triggered animations are
            when a normal animation is triggered when an element enters or
            leaves the viewport.
          </p>
        </div>
      </motion.div>
   
      
    </div>
  );
}
