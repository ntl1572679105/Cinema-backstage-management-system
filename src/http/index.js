import actorApi from "./apis/ActorApi";
import movieApi from "./apis/MovieApi";
import cinemaApi from "./apis/CinemaApi";
import directorApi from './apis/Director'
import cinemaRoomApi from "./apis/CinemaRoomApi";
import showingonPlanApi from './apis/ShowingonPlanApi'
import adminApi from "./apis/AdminApi";

// 当前index.js, 整合apis文件夹中的所有接口
const httpApi = {

  actorApi,
  directorApi,
  movieApi,
  cinemaApi,
  cinemaRoomApi,
  showingonPlanApi,
  adminApi,
}

export default httpApi;