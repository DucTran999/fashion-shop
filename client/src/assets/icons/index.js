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

  /* Social */
  google: <GoogleOutlined />,
  facebook: <FacebookOutlined />,
  facebookFilled: <FacebookFilled />,
  instagram: <InstagramOutlined />,
  youtube: <YoutubeOutlined />,
};

export default ICONS;
