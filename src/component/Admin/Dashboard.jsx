import CardDataStats from '../../component/CardDataStats';
// import BarChartIcon from '@mui/icons-material/BarChart';
import Highcharts from "highcharts";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
// import PeopleIcon from '@mui/icons-material/People';
// import HighchartsReact from "highcharts-react-official";
import Highcharts3D from "highcharts/highcharts-3d";
import Iconify from "../../component/iconify";
// import { getAdminProducts, clearErrors } from "../../actions/productAction";

// import MetaData from "../layouts/MetaData/MetaData";
// import Loader from "../layouts/Loader/Loader";
// import { toast } from "react-toastify";
// import { getAllOrders } from "../../actions/orderAction";
// import { getAllUsers } from "../../actions/userAction";
// import { getAdminBrands } from "../../actions/brandAction";
// import { getAdminCategories } from "../../actions/categoryAction";
// import { getAdminProducts, clearErrors } from "../../redux/slices/productSlice";
// import { getAllOrders } from "../../redux/slices/orderSlice";
// import { useNavigate } from "react-router-dom";
// import { Typography } from '@mui/material';
// import ProductImg from "../../Image/admin/products.png";
// import ordersImg from "../../Image/admin/order.png";
// import usersImg from "../../Image/admin/user.png";
import DefaultLayout from '../layouts/DefaultLayout';
Highcharts3D(Highcharts);
// const useStyles = makeStyles((theme) => ({
//   dashboard: {
//     display: "flex",
//     alignItems: "flex-start",
//     backgroundColor: "#f1f1f1",
//     justifyContent: "center",
//     width: "100%",
//     gap: "1rem",
//     overflow: "hidden",
//     margin: 0,
//     padding: 0,
//   },
//   firstBox: {
//     width: "20%",
//     margin: "0rem",
//     height: "fit-content",
//     backgroundColor: "white",
//     borderRadius: "5px",
//     boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
//     display: "block",
//     [theme.breakpoints.down("999")]: {
//       display: "none",
//     },
//   },

//   toggleBox: {
//     width: "16rem",
//     margin: "0rem",
//     height: "fit-content",
//     backgroundColor: "white",
//     borderRadius: "5px",
//     boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
//     display: "block",
//     zIndex: "100",
//     position: "absolute",
//     top: "58px",
//     left: "17px",
//   },
//   secondBox: {
//     width: "75%",
//     height: "fit-content",
//     display: "flex",
//     flexDirection: "column",
//     gap: "1rem",
//     justifyContent: "center",
//     [theme.breakpoints.down("999")]: {
//       width: "100%",
//     },
//   },
//   navBar: {
//     margin: "0rem",
//   },
//   summaryCard: {
//     display: "flex",
//     justifyContent: "center",
//     color: "white",
//     width: "100%",
//     height: "15rem",
//     gap: "1rem",
//     margin: "1rem 0 0 0",

//     [theme.breakpoints.down("sm")]: {
//       flexDirection: "column",
//       height: "20rem",
//       alignItems: "center",
//       marginTop: "7rem !important",
//     },
//   },
//   cardContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#414141",
//     margin: "0 1rem ",
//     width: "30%",
//     height: "10rem",

//     borderRadius: "5px",
//     boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
//     transition: "transform 0.2s ease-in-out",
//     cursor: "pointer",
//     "&:hover": {
//       transform: "scale(1.1) !important",
//       backgroundColor: "#ed1c24 ",
//       boxShadow: "0px 0px 10px rgba(0, 0, 0, black) !important",
//     },
//     [theme.breakpoints.between("sm", "md")]: {
//       width: "32% !important",
//       marginBottom: "1rem !important",
//       padding: "1rem 2rem ! important",
//     },
//     [theme.breakpoints.down("sm")]: {
//       width: "85% !important",
//       marginBottom: "1rem !important",
//       padding: "2rem 2rem ! important",
//     },
//     [theme.breakpoints.down("xs")]: {
//       width: "85%",

//       padding: "1.2rem",
//       margin: "0   auto",
//       marginBottom: "1rem",
//       "&:hover": {
//         transform: "scale(1.05) !important",
//       },
//     },
//   },
//   textContainer: {
//     marginTop: "0.5rem",
//     textAlign: "center",
//     color: "white",
//     textShadow: "1px 1px 2px black",
//   },
//   heading: {
//     fontSize: "20px",
//     fontWeight: 800,
//     marginBottom: "0.5rem",
//     textShadow: "1px 1px 2px black",
//     [theme.breakpoints.down("md")]: {
//       fontSize: "18px",
//     },
//     [theme.breakpoints.down("sm")]: {
//       fontSize: "22px",
//     },
//   },
//   number: {
//     fontSize: "1.5rem",
//     fontWeight: 500,
//     textShadow: "1px 1px 2px black",
//   },
//   headerConetnt: {
//     display: "flex",
//     gap: "1rem",
//     alignItems: "center",
//     color: "white",

//     [theme.breakpoints.down("md")]: {
//       "& svg": {
//         fontSize: "2rem",
//       },
//     },

//     [theme.breakpoints.down("sm")]: {
//       "& svg": {
//         fontSize: "3rem",
//       },
//     },
//   },
//   revenue: {
//     width: "100%",
//     height: "fit-content",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     margin: "-2.5rem auto 0",
//     [theme.breakpoints.down("sm")]: {
//       flexDirection: "column",
//       marginTop: "5rem !important",
//     },
//   },
//   doughnutChart: {
//     height: "fit-content",
//     width: "42%",
//     backgroundColor: "white",
//     borderRadius: "5px",
//     boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
//     padding: "1rem 2rem",
//     margin: "0 1rem",
//     [theme.breakpoints.down("md")]: {
//       width: "30%",
//       padding: "1rem 3rem",
//       ".highcharts-background": {
//         height: "350px !important",
//       },
//     },
//     [theme.breakpoints.down("sm")]: {
//       width: "85%",
//       padding: "2rem",
//       marginTop: "2rem",
//     },

//     [theme.breakpoints.down("xs")]: {
//       width: "85%",
//       marginBottom: "1rem",
//       padding: "1.2rem",
//     },
//   },
//   revnueContainer: {
//     width: "42%",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     margin: "0 1rem",
//     height: "400px",
//     backgroundColor: "black",
//     borderRadius: "5px",
//     padding: "1rem 2rem",
//     boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
//     transition: "background-color 0.3s",

//     [theme.breakpoints.down("sm")]: {
//       width: "85% !important",
//       padding: "1rem",
//       height: "250px",
//     },

//     [theme.breakpoints.down("md")]: {
//       width: "30%",
//       padding: "1rem 3rem",
//     },
//     [theme.breakpoints.down("sm")]: {
//       marginTop: "1rem",
//       width: "85% !important",
//       padding: "2rem !important",
//       height: "250px",
//     },

//     [theme.breakpoints.down("xs")]: {
//       width: "85%",
//       marginBottom: "1rem",
//       padding: "1rem !important",
//     },
//   },
//   lineChart: {
//     width: "90%",
//     height: "fit-content",
//     backgroundColor: "white",
//     alignItems: "center",
//     borderRadius: "5px",
//     boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
//     padding: "2rem",
//     margin: "1rem auto",

//     [theme.breakpoints.down("sm")]: {
//       width: "85%",
//     },

//     [theme.breakpoints.down("xs")]: {
//       width: "85%",
//       marginBottom: "1rem",
//       padding: "1.2rem",
//     },
//   },
// }));

const Dashboard = () => {
  // const classes = useStyles();
  // const navigate = useNavigate();
  // const [toggle, setToggle] = useState(false);
  // let OutOfStock = 0;
  // products &&
  //   products.forEach((element) => {
  //     // check how much items out of stocks in products array
  //     if (element.stock === 0) {
  //       OutOfStock += 1;
  //     }
  //   });



  // useEffect(() => {
  //   // dispatch(getAllOrders());
  //   dispatch(getAllUsers());
  //   dispatch(getAdminBrands());
  //   dispatch(getAdminCategories());
  // }, [dispatch]);
  // console.log(users)
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total users" total="1" levelUp>
          <Iconify icon="ph:user-fill" />
        </CardDataStats>
        <CardDataStats title="Total Product" total="1" levelUp>
          <Iconify icon="gridicons:product" />
        </CardDataStats>
        <CardDataStats title="Total Brand" total="1" levelUp>
          <Iconify icon="gridicons:phone" />
        </CardDataStats>
        <CardDataStats title="Total Category" total="1" levelDown>
          <Iconify icon="material-symbols:category" />
        </CardDataStats>
      </div>
    </DefaultLayout>
  );
}

export default Dashboard;