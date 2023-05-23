import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";
import { logOutUser } from "../../features/auth/apiRequest";

// Component
import ImageCard from "../../components/Card/ImageCard";
import ModalContainer from "../../components/Modal/ModalContainer";
import ICONS from "../../assets/icons";
import IMAGES from "../../assets/images";

//Style
import classNames from "classnames/bind";
import styles from "./PrimaryHeader.module.scss";

const cx = classNames.bind(styles);

function HeaderPrimary() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    await logOutUser(dispatch, navigate, location);
  };

  const [showSidebar, setShowSidebar] = useState(false);

  const handleShowSidebar = () => {
    document.body.style.overflow = "hidden";
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    document.body.style.overflowY = "scroll";
    setShowSidebar(false);
  };

  // PC component
  const Logo = () => {
    return (
      <Link to="/" className={cx("logo-link")}>
        <img src={IMAGES.logo} alt="Shop logo" className={cx("logo-img")} />
      </Link>
    );
  };

  const PrimaryNavBar = () => {
    return (
      <ul className={cx("primary-nav")}>
        <li className={cx("nav-item")}>
          <Link to="/" className={cx("nav-link")}>
            Home
          </Link>
        </li>
        <li className={cx("nav-item", "nav-item--category")}>
          <Link to="/category" className={cx("nav-link")}>
            Category
          </Link>
          <CategorySection />
        </li>
        <li className={cx("nav-item")}>
          <Link to="/lookbook" className={cx("nav-link")}>
            Lookbook
          </Link>
        </li>
        <li className={cx("nav-item")}>
          <Link to="/blogs" className={cx("nav-link")}>
            Blog
          </Link>
        </li>
        <li className={cx("nav-item")}>
          <Link to="/stores" className={cx("nav-link")}>
            Showroom
          </Link>
        </li>
      </ul>
    );
  };

  const CategorySection = () => {
    return (
      <section className={cx("category-section")}>
        <Container className={cx("category-wrap")}>
          <Row>
            <Col lg="3" className={cx("col-center", "d-none d-lg-block")}>
              <ImageCard
                linkTo="/blogs"
                imageUrl={IMAGES.lookbookPoster1}
                cardStyle="medium"
                title="Buy Now"
                titleStyle={"card__title--abs"}
              />
            </Col>
            <Col lg="3" className={cx("col-center", "d-none d-lg-block")}>
              <ImageCard
                linkTo="/blogs"
                imageUrl={IMAGES.lookbookPoster2}
                cardStyle="medium"
                title="Buy Now"
                titleStyle={"card__title--abs"}
              />
            </Col>
            <Col md="4" lg="2">
              <DiscountList />
            </Col>
            <Col md="4" lg="2">
              <CategoryList />
            </Col>
            <Col md="4" lg="2">
              <TrendingList />
            </Col>
          </Row>
        </Container>
      </section>
    );
  };

  const CategoryList = () => {
    return (
      <nav className={cx("util-nav")}>
        <div className={cx("util-nav__header")}>Products</div>
        <div className={cx("util-nav__list", "upper")}>Upper Body</div>
        <Link className={cx("util-nav__item")}>
          <span className={cx("util-nav__item-title")}>Blazer</span>
        </Link>
        <Link className={cx("util-nav__item")}>Blouse </Link>
        <Link className={cx("util-nav__item")}>T-shirt</Link>
        <Link className={cx("util-nav__item")}>Croptop </Link>

        <div className={cx("util-nav__list", "lower")}>Lower Body</div>
        <Link className={cx("util-nav__item")}>Dress</Link>
        <Link className={cx("util-nav__item")}>Short</Link>
        <Link className={cx("util-nav__item")}>Skirt</Link>
        <Link className={cx("util-nav__item")}>Flare</Link>
      </nav>
    );
  };

  const DiscountList = () => {
    return (
      <nav className={cx("util-nav")}>
        <div className={cx("util-nav__header")}>Discount</div>
        <Link to="/blogs" className={cx("util-nav__item")}>
          First time
        </Link>
        <Link to="/blogs" className={cx("util-nav__item")}>
          Members
        </Link>
      </nav>
    );
  };

  const TrendingList = () => {
    return (
      <nav className={cx("util-nav")}>
        <div className={cx("util-nav__header")}>Trending</div>
        <Link to="/blogs" className={cx("util-nav__item")}>
          Blazer & Short
        </Link>
        <Link to="/blogs" className={cx("util-nav__item")}>
          T-Shirt & Flare
        </Link>
      </nav>
    );
  };

  const UserBarIsLogged = () => {
    return (
      <>
        <Link to="/" className={cx("sub-nav__link")}>
          <img
            src={IMAGES.defaultAvatar}
            className={cx("user-avatar")}
            alt="user avatar"
          />
        </Link>
        <ul className={cx("user-options")}>
          <li className={cx("user-options__option")}>
            <Link to="/login" className={cx("user-options__link")}>
              Account Settings
            </Link>
          </li>
          <li className={cx("user-options__option")}>
            <Link to="/register" className={cx("user-options__link")}>
              Notification
            </Link>
          </li>
          <li className={cx("user-options__option")}>
            <Link to="/register" className={cx("user-options__link")}>
              My Purchases
            </Link>
            <div className={cx("user-options__separate")}></div>
          </li>
          <li className={cx("user-options__option")}>
            <span className={cx("user-options__link")} onClick={handleLogOut}>
              Log out
            </span>
          </li>
        </ul>
      </>
    );
  };

  const UserBarIsNotLogged = () => {
    return (
      <>
        <Link to="/login" className={cx("sub-nav__link")}>
          {ICONS.user}
        </Link>
        <ul className={cx("user-options")}>
          <li className={cx("user-options__option")}>
            <Link to="/login" className={cx("user-options__link")}>
              Login
            </Link>
          </li>
          <li className={cx("user-options__option")}>
            <Link to="/register" className={cx("user-options__link")}>
              Register
            </Link>
          </li>
        </ul>
      </>
    );
  };

  // Component in Tab size
  const MenuDropDown = () => {
    return (
      <div className={cx("menu--tablet")}>
        {ICONS.menu}
        {user ? (
          <MenuDropDownServiceHasLogin />
        ) : (
          <MenuDropDownServiceNoLogin />
        )}
      </div>
    );
  };

  const MenuDropDownServiceHasLogin = () => {
    return (
      <nav className={cx("menu__dropdown--tablet")}>
        <section className={cx("dropdown__service")}>
          <Link to="/search" className={cx("menu__dropdown--tablet__element")}>
            Search
          </Link>
          <Link to="/cart" className={cx("menu__dropdown--tablet__element")}>
            Cart
          </Link>
          <Link
            to="/purchases"
            className={cx("menu__dropdown--tablet__element")}
          >
            My Purchases
          </Link>
          <Link
            to="/wishlist"
            className={cx("menu__dropdown--tablet__element")}
          >
            Wishlist
          </Link>
        </section>
        <section className={cx("dropdown__service", "last")}>
          <Link to="/users" className={cx("menu__dropdown--tablet__element")}>
            Account Settings
          </Link>
          <span
            className={cx("menu__dropdown--tablet__element")}
            onClick={handleLogOut}
          >
            Log out
          </span>
        </section>
      </nav>
    );
  };

  const MenuDropDownServiceNoLogin = () => {
    return (
      <nav className={cx("menu__dropdown--tablet")}>
        <section className={cx("dropdown__service")}>
          <Link to="/search" className={cx("menu__dropdown--tablet__element")}>
            Search
          </Link>
          <Link to="/cart" className={cx("menu__dropdown--tablet__element")}>
            Cart
          </Link>
        </section>
        <section className={cx("dropdown__service", "last")}>
          <Link to="/login" className={cx("menu__dropdown--tablet__element")}>
            Login
          </Link>
          <Link
            to="/register"
            className={cx("menu__dropdown--tablet__element")}
          >
            Register
          </Link>
        </section>
      </nav>
    );
  };

  // Component in Mobile size
  const BackHomeButton = () => {
    return (
      <Link to="/" className={cx("btn-back-home")}>
        {ICONS.backArrow}
      </Link>
    );
  };

  const Menu = () => {
    return (
      <span className={cx("menu")} onClick={handleShowSidebar}>
        {ICONS.menu}
      </span>
    );
  };

  const SideBarHasLogin = () => {
    return (
      <ModalContainer>
        <div
          className={
            showSidebar
              ? cx("sidebar-wrap", "active")
              : cx("sidebar-wrap", "inactive")
          }
          key={Math.random()}
        >
          <div className={cx("sidebar-header")}>
            <span
              className={cx("sidebar-header__close", "col-right")}
              onClick={handleCloseSidebar}
            >
              {ICONS.rightArrowLine}
            </span>
            <div className={cx("sidebar-header__title", "col-center")}>
              {`Hi, username`}
            </div>
          </div>

          <section className={cx("sidebar-service")}>
            <nav className={cx("service-list")}>
              <Link to="/search" className={cx("service-item")}>
                Search
              </Link>
              <Link to="/category" className={cx("service-item")}>
                Category
              </Link>
              <Link to="/lookbook" className={cx("service-item")}>
                Lookbook
              </Link>
              <Link to="/blogs" className={cx("service-item")}>
                Blog
              </Link>
              <Link to="/stores" className={cx("service-item")}>
                Showroom
              </Link>
            </nav>
          </section>

          <section className={cx("sidebar-service")}>
            <nav className={cx("service-list")}>
              <Link to="/blogs" className={cx("service-item")}>
                Notification
              </Link>
              <Link to="/blogs" className={cx("service-item")}>
                My Purchases
              </Link>
              <Link to="/cart" className={cx("service-item")}>
                Cart
              </Link>
            </nav>
          </section>

          <section className={cx("sidebar-service", "last-service")}>
            <nav className={cx("service-list")}>
              <Link to="/user" className={cx("service-item")}>
                Account Settings
              </Link>
              <span className={cx("service-item")} onClick={handleLogOut}>
                Log out
              </span>
            </nav>
          </section>
        </div>
      </ModalContainer>
    );
  };

  const SideBarNoLogin = () => {
    return (
      <ModalContainer>
        <div
          className={
            showSidebar
              ? cx("sidebar-wrap", "active")
              : cx("sidebar-wrap", "inactive")
          }
          key={Math.random()}
        >
          <div className={cx("sidebar-header")}>
            <span
              className={cx("sidebar-header__close", "col-right")}
              onClick={handleCloseSidebar}
            >
              {ICONS.rightArrowLine}
            </span>
            <div className={cx("sidebar-header__title", "col-center")}>
              Atlana Shop
            </div>
          </div>

          <section className={cx("sidebar-service")}>
            <nav className={cx("service-list")}>
              <Link to="/search" className={cx("service-item")}>
                Search
              </Link>
              <Link to="/category" className={cx("service-item")}>
                Category
              </Link>
              <Link to="/lookbook" className={cx("service-item")}>
                Lookbook
              </Link>
              <Link to="/blogs" className={cx("service-item")}>
                Blog
              </Link>
              <Link to="/stores" className={cx("service-item")}>
                Showroom
              </Link>
            </nav>
          </section>

          <section className={cx("sidebar-service", "last-service")}>
            <nav className={cx("service-list")}>
              <Link to="/cart" className={cx("service-item")}>
                Cart
              </Link>
              <Link to="/login" className={cx("service-item")}>
                Sign in
              </Link>
              <Link to="/register" className={cx("service-item")}>
                Sign up
              </Link>
            </nav>
          </section>
        </div>
      </ModalContainer>
    );
  };

  return (
    <header className={cx("header")}>
      <Container>
        <Row className={cx("row-center")}>
          <Col xs={3} className={cx("col-center", "d-block-below-sm")}>
            <BackHomeButton />
          </Col>
          <Col xs={6} md={2} className={cx("col-center")}>
            <Logo />
          </Col>
          <Col className="d-none d-md-block" md={9} lg={8}>
            <PrimaryNavBar />
          </Col>
          <Col className="d-none d-lg-block" md={2}>
            <ul className={cx("sub-nav")}>
              <li className={cx("sub-nav__item")}>
                <Link to="/search" className={cx("sub-nav__link")}>
                  {ICONS.search}
                </Link>
              </li>
              <li className={cx("sub-nav__item", "user")}>
                {user ? <UserBarIsLogged /> : <UserBarIsNotLogged />}
              </li>
              <li className={cx("sub-nav__item")}>
                <Link to="/wishlist" className={cx("sub-nav__link")}>
                  {ICONS.favourite}
                </Link>
              </li>
              <li className={cx("sub-nav__item")}>
                <Link to="/cart" className={cx("sub-nav__link")}>
                  {ICONS.cart}
                </Link>
                <span className={cx("cart__num-products")}>10</span>
              </li>
            </ul>
          </Col>
          <Col md={1} className={cx("col-center", "d-block-below-lg")}>
            <MenuDropDown />
          </Col>
          <Col xs={3} className={cx("col-center", "d-block-below-sm")}>
            <Menu />
          </Col>
          {showSidebar && (user ? <SideBarHasLogin /> : <SideBarNoLogin />)}
        </Row>
      </Container>
    </header>
  );
}

export default HeaderPrimary;
