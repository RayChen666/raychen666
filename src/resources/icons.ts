import { IconType } from "react-icons";
import { 
  FaFilePdf,
  FaFile,
} from "react-icons/fa6";

import { 
  FaNodeJs,
  FaHtml5,
  FaDocker,
  FaJava,
  FaLinux,
  FaFileAlt,
} from "react-icons/fa";

import { GrMysql } from "react-icons/gr";

import {
  HiArrowUpRight,
  HiOutlineLink,
  HiArrowTopRightOnSquare,
  HiEnvelope,
  HiCalendarDays,
  HiArrowRight,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineDocument,
  HiOutlineGlobeAsiaAustralia,
  HiOutlineRocketLaunch,
} from "react-icons/hi2";

import {
  PiHouseDuotone,
  PiUserCircleDuotone,
  PiGridFourDuotone,
  PiBookBookmarkDuotone,
  PiImageDuotone,
} from "react-icons/pi";

import {
  SiJavascript,
  SiNextdotjs,
  SiFigma,
  SiSupabase,
  SiThreedotjs,
  SiFastapi,
  SiLangchain,
  SiLatex,
  SiTensorflow,
  SiGooglecolab,
  SiMediapipe,
  SiOpencv,
  SiScikitlearn,
  SiPytorch,
  SiGooglegemini,
  SiPostman,
  SiJira,
} from "react-icons/si";

import { FaDiscord, FaGithub, FaLinkedin, FaX, FaThreads, FaInstagram, FaXTwitter, FaFacebook, FaPinterest, FaWhatsapp, FaReddit, FaTelegram, } from "react-icons/fa6";

export const iconLibrary: Record<string, IconType> = {
  arrowUpRight: HiArrowUpRight,
  arrowRight: HiArrowRight,
  email: HiEnvelope,
  globe: HiOutlineGlobeAsiaAustralia,
  person: PiUserCircleDuotone,
  grid: PiGridFourDuotone,
  book: PiBookBookmarkDuotone,
  openLink: HiOutlineLink,
  calendar: HiCalendarDays,
  home: PiHouseDuotone,
  gallery: PiImageDuotone,
  discord: FaDiscord,
  eye: HiOutlineEye,
  eyeOff: HiOutlineEyeSlash,
  github: FaGithub,
  linkedin: FaLinkedin,
  x: FaX,
  twitter: FaXTwitter,
  threads: FaThreads,
  arrowUpRightFromSquare: HiArrowTopRightOnSquare,
  document: HiOutlineDocument,
  rocket: HiOutlineRocketLaunch,
  javascript: SiJavascript,
  nextjs: SiNextdotjs,
  supabase: SiSupabase,
  figma: SiFigma,
  threejs: SiThreedotjs,
  nodejs: FaNodeJs,
  html5: FaHtml5,
  fastapi: SiFastapi,
  langchain: SiLangchain,
  latex: SiLatex,
  docker: FaDocker,
  tensorflow: SiTensorflow,
  colab: SiGooglecolab,
  mediapipe: SiMediapipe,
  opencv: SiOpencv,
  java: FaJava,
  scikitlearn: SiScikitlearn,
  pytorch: SiPytorch,
  gemini: SiGooglegemini,
  linux: FaLinux,
  postman: SiPostman,
  jira: SiJira,
  sql: GrMysql ,
  pdf: FaFilePdf,
  file: FaFileAlt,
  facebook: FaFacebook,
  pinterest: FaPinterest,
  whatsapp: FaWhatsapp,
  reddit: FaReddit,
  telegram: FaTelegram,
  instagram: FaInstagram,
  
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;
