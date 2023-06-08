import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FacebookFilled,
  FacebookOutlined,
  GoogleOutlined,
  HomeOutlined,
  InstagramOutlined,
  LeftOutlined,
  RightOutlined,
  LoadingOutlined,
  MailFilled,
  MailOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  SendOutlined,
  YoutubeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  HeartOutlined,
  CaretRightOutlined,
  MenuOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

import { BiMoney } from "react-icons/bi";
import { BsFillBellFill } from "react-icons/bs";
import { RiBillFill } from "react-icons/ri";
import { FaBoxOpen } from "react-icons/fa";
import { MdCurrencyExchange, MdLocalShipping } from "react-icons/md";
import { AiFillCreditCard, AiFillSetting } from "react-icons/ai";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const ICONS = {
  /* Interact */
  backArrow: <LeftOutlined />,
  nextArrow: <RightOutlined />,
  send: <SendOutlined />,
  search: <SearchOutlined />,
  cart: <ShoppingCartOutlined />,
  user: <UserOutlined />,
  favourite: <HeartOutlined />,
  menu: <MenuOutlined />,
  rightArrowLine: <ArrowRightOutlined />,

  /* Expression */
  home: <HomeOutlined />,
  help: <QuestionCircleOutlined />,
  email: <MailOutlined />,
  emailFilled: <MailFilled />,
  checkCircle: <CheckCircleOutlined />,
  errorCircle: <CloseCircleOutlined />,
  loading: <LoadingOutlined />,
  rightArrow: <CaretRightOutlined />,
  moneyBag: <BiMoney />,
  shipping: <MdLocalShipping />,
  exchange: <MdCurrencyExchange />,
  paymentCard: <AiFillCreditCard />,
  boxOpen: <FaBoxOpen />,
  headphone: <TfiHeadphoneAlt />,
  settings: <AiFillSetting />,
  bell: <BsFillBellFill />,
  bill: <RiBillFill />,

  /* Social */
  google: <GoogleOutlined />,
  facebook: <FacebookOutlined />,
  facebookFilled: <FacebookFilled />,
  instagram: <InstagramOutlined />,
  youtube: <YoutubeOutlined />,
};

export default ICONS;
