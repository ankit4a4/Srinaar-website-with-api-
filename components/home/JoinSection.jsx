"use client";

import { useState } from "react";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import modelImg from "../../assets/home/collection.png";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn, selectUser, logout } from "@/lib/redux/authSlice";
import { useGoogleButton } from "@/lib/google/GoogleAuthProvider";
import { useGetMyOrdersQuery } from "@/lib/redux/api";

export default function JoinSection() {
  const [activeTab, setActiveTab] = useState("login");
  const [direction, setDirection] = useState(1);

  const isLogin = activeTab === "login";
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const googleButtonRef = useGoogleButton({ width: 240 });

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;

    setDirection(tab === "signup" ? 1 : -1);
    setActiveTab(tab);
  };

  const formVariants = {
    initial: (direction) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const imageTextVariants = {
    initial: (direction) => ({
      x: direction > 0 ? -60 : 60,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? 60 : -60,
      opacity: 0,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  if (isLoggedIn) {
    return <LoggedInCard user={user} dispatch={dispatch} />;
  }

  return (
    <section className=" py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mb-3 font-serif text-4xl text-[#8f0b24] sm:text-5xl md:text-6xl">
          Join the Srinaar
        </h2>

        <div className="mb-12 flex items-center justify-center gap-4">
          <div className="hidden h-[1px] w-40 bg-[#8f0b24] md:block" />
          <span className="text-xl text-[#8f0b24]">•</span>
          <h3 className="font-serif text-2xl text-black sm:text-3xl">
            Get Exclusive Offers
          </h3>
          <span className="text-xl text-[#8f0b24]">•</span>
          <div className="hidden h-[1px] w-40 bg-[#8f0b24] md:block" />
        </div>


        <div className="mx-auto max-w-[980px] overflow-hidden rounded-[18px] border border-[#e5dfd6] bg-[#f7f7f7] shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Form Side */}
            <motion.div
              layout
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className={`bg-[#f7f7f7] ${
                isLogin ? "md:order-1" : "md:order-2"
              }`}
            >
              <div className="relative flex min-h-[520px] flex-col items-center justify-center px-6 py-8 sm:px-10 overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeTab}
                    custom={direction}
                    variants={formVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full max-w-[320px]"
                  >
                    <h3 className="text-center font-serif text-[28px] font-semibold text-[#111]">
                      {isLogin ? "Welcome Back!" : "Create Your Account"}
                    </h3>

                    <p className="mt-2 text-center text-[13px] text-[#666]">
                      {isLogin
                        ? "Get 50% OFF on your first order"
                        : "Sign up and unlock exclusive offers and faster checkout."}
                    </p>

                    <div className="mt-4 flex justify-center">
                      <span className="inline-flex rounded-sm bg-[#980022] px-3 py-[4px] text-[10px] uppercase tracking-wide text-white">
                        USE CODE : WELCOME20
                      </span>
                    </div>

                   

                    {isLogin ? (
                      <div className="mt-5 space-y-4">
                        <div className="flex h-[42px] items-center overflow-hidden rounded-[6px] border border-[#dbdbdb] bg-white px-3">
                          <HiOutlineMail className="mr-2 text-[16px] text-[#777]" />
                          <input
                            type="email"
                            placeholder="Email Address"
                            className="h-full flex-1 bg-white text-[13px] text-[#333] outline-none"
                          />
                        </div>

                        <div className="flex h-[42px] items-center overflow-hidden rounded-[6px] border border-[#dbdbdb] bg-white px-3">
                          <HiOutlineLockClosed className="mr-2 text-[16px] text-[#777]" />
                          <input
                            type="password"
                            placeholder="Password"
                            className="h-full flex-1 bg-white text-[13px] text-[#333] outline-none"
                          />
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="button"
                            className="text-[12px] font-medium text-[#980022] hover:underline"
                          >
                            Forgot Password?
                          </button>
                        </div>

                        <button
                          type="button"
                          disabled
                          title="Abhi sirf Google se sign in available hai"
                          className="h-[42px] w-full cursor-not-allowed rounded-[6px] bg-[#980022]/40 text-[14px] font-medium text-white"
                        >
                          Sign In
                        </button>
                        <p className="text-center text-[11px] text-[#999]">
                          Abhi sirf Google se sign in available hai — neeche se karo
                        </p>
                      </div>
                    ) : (
                      <div className="mt-5 space-y-4">
                        <div className="flex h-[42px] items-center overflow-hidden rounded-[6px] border border-[#dbdbdb] bg-white px-3">
                          <FiUser className="mr-2 text-[15px] text-[#777]" />
                          <input
                            type="text"
                            placeholder="Full Name"
                            className="h-full flex-1 bg-white text-[13px] text-[#333] outline-none"
                          />
                        </div>

                        <div className="flex h-[42px] items-center overflow-hidden rounded-[6px] border border-[#dbdbdb] bg-white px-3">
                          <HiOutlineMail className="mr-2 text-[16px] text-[#777]" />
                          <input
                            type="email"
                            placeholder="Email Address"
                            className="h-full flex-1 bg-white text-[13px] text-[#333] outline-none"
                          />
                        </div>

                        <div className="flex h-[42px] items-center overflow-hidden rounded-[6px] border border-[#dbdbdb] bg-white px-3">
                          <HiOutlineLockClosed className="mr-2 text-[16px] text-[#777]" />
                          <input
                            type="password"
                            placeholder="Password"
                            className="h-full flex-1 bg-white text-[13px] text-[#333] outline-none"
                          />
                        </div>

                        <div className="flex h-[42px] items-center overflow-hidden rounded-[6px] border border-[#dbdbdb] bg-white px-3">
                          <HiOutlineLockClosed className="mr-2 text-[16px] text-[#777]" />
                          <input
                            type="password"
                            placeholder="Confirm Password"
                            className="h-full flex-1 bg-white text-[13px] text-[#333] outline-none"
                          />
                        </div>

                        <button
                          type="button"
                          disabled
                          title="Abhi sirf Google se sign up available hai"
                          className="h-[42px] w-full cursor-not-allowed rounded-[6px] bg-[#980022]/40 text-[14px] font-medium text-white"
                        >
                          Create Account
                        </button>
                        <p className="text-center text-[11px] text-[#999]">
                          Abhi sirf Google se sign up available hai — neeche se karo
                        </p>
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-center w-full gap-3">
                      <div ref={googleButtonRef} />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Image Side */}
            <motion.div
              layout
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className={`p-2 sm:p-3 ${
                isLogin ? "md:order-2" : "md:order-1"
              }`}
            >
              <div className="relative h-[320px] overflow-hidden rounded-[14px] sm:h-[520px]">
                <motion.img
                  key={activeTab + "-image"}
                  src={modelImg.src}
                  alt="Srinaar"
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-full object-cover object-top"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#980022]/85 via-[#980022]/20 to-black/10" />

                <div className="absolute inset-x-0 bottom-0 p-6 text-center text-white overflow-hidden">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={activeTab + "-text"}
                      custom={direction}
                      variants={imageTextVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <h3 className="font-serif text-[28px] leading-none sm:text-[34px]">
                        {isLogin ? "Hi. Welcome Back" : "Join the Srinaar"}
                      </h3>

                      <p className="mt-2 text-[12px] text-white/90">
                        {isLogin
                          ? "New here? Create your account now"
                          : "Already have an account? Sign in"}
                      </p>

                      <button
                        onClick={() =>
                          handleTabChange(isLogin ? "signup" : "login")
                        }
                        className="mt-5 h-[42px] w-full rounded-[8px] bg-white text-[16px] font-medium text-[#1a1a1a] transition-all duration-300 hover:bg-[#f3f3f3] hover:scale-[1.01]"
                      >
                        {isLogin ? "Sign Up" : "Sign In"}
                      </button>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <p className="mt-5 text-[12px] text-[#6f6f6f]">
          By continuing, you agree to our terms and privacy policy.
        </p>
      </div>
    </section>
  );
}
function LoggedInCard({ user, dispatch }) {
  const { data: orders, isLoading } = useGetMyOrdersQuery();

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-2xl rounded-[18px] border border-[#e5dfd6] bg-[#f7f7f7] p-10 text-center shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
        <h2 className="font-serif text-3xl text-[#8f0b24]">
          Welcome back, {user?.name?.split(" ")[0] || "there"}!
        </h2>
        <p className="mt-2 text-sm text-[#666]">{user?.email}</p>

        <button
          onClick={() => dispatch(logout())}
          className="mt-6 rounded-[6px] border border-[#980022] px-6 py-2.5 text-sm font-medium text-[#980022] transition hover:bg-[#980022] hover:text-white"
        >
          Logout
        </button>

        {!isLoading && orders?.length > 0 && (
          <div className="mt-10 text-left">
            <h3 className="mb-4 text-center font-serif text-xl text-[#2a1a14]">
              Recent Orders
            </h3>
            <div className="space-y-3">
              {orders.slice(0, 3).map((order) => (
                <div
                  key={order._id}
                  className="flex items-center justify-between rounded-[10px] border border-[#eadfd7] bg-white px-4 py-3 text-sm"
                >
                  <span className="font-medium text-[#2a1a14]">{order.orderId}</span>
                  <span className="text-[#8b6f63]">{order.status}</span>
                  <span className="font-semibold text-[#990027]">
                    ₹{order.amount?.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
