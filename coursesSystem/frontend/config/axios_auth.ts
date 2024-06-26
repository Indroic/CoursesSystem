import axios from "axios";

import {
  base_url,
  url_login,
  url_verify_token,
  url_get_user,
  url_register_user,
  url_courses,
  url_modules,
  url_lessons,
} from "./constands";

const axiosRequest = axios.create({
  baseURL: base_url,
  headers: { "Content-Type": "application/json" },
});

const axiosRequestWithAuth = (token: string) => {
  return axios.create({
    baseURL: base_url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, //eslint-disable-line
    },
  });
};

const LoginRequest = async (username: string, password: string) => {
  const request = await axiosRequest.post(url_login, {
    username: username,
    password: password,
  });

  return request;
};

const RegisterRequest = async (
  first_name: string,
  last_name: string,
  username: string,
  ci: string,
  email: string,
  password: string
) => {
  const request = await axiosRequest.post(url_register_user, {
    first_name: first_name,
    last_name: last_name,
    username: username,
    ci: ci,
    email: email,
    password: password,
  });

  return request;
};

const RefreshTokenRequest = async (token: string, username: string) => {
  const request = await axiosRequest.post(url_verify_token, {
    token: token,
    username: username,
  });

  return request;
};

const VerifyRequest = async (name: string, token: string) => {
  const request = await axiosRequest.post(url_verify_token, {
    username: name,
    token: token,
  });

  return request;
};

const GetUserRequest = async (token: string, ID: string) => {
  const request = await axiosRequestWithAuth(token).get(url_get_user + ID);

  return request;
};

const GetCoursesRequest = async (userID: string) => {
  const url = userID ? `${url_courses}?search=${userID}` : url_courses;

  const request = await axiosRequest.get(url);

  return request;
};

const GetCourseRequest = async (id: string) => {
  const request = await axiosRequest.get(url_courses + id);

  return request;
};

const GetModulesRequest = async (course_id: string) => {
  const request = await axiosRequest.get(url_modules + `?search=${course_id}`);

  return request;
};

const GetLessonsRequest = async () => {
  const request = await axiosRequest.get(url_lessons);

  return request;
};

const GetLessonsOfModuleRequest = async (module_id: string) => {
  const request = await axiosRequest.get(url_lessons + `?search=${module_id}`);

  return request;
};

const GetModuleRequest = async (module_id: string) => {
  const request = await axiosRequest.get(url_modules + `${module_id}`);

  return request;
};

const DeleteCourse = async (module_id: string, token: string) => {
  const request = await axiosRequestWithAuth(token).delete(
    url_courses + `${module_id}`
  );
};

const CreateLessonRequest = async (data: any, token: string) => {
  const request = await axiosRequestWithAuth(token).post(url_lessons, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return request;
};

const CreateCourseRequest = async (data: any, token: string) => {
  const request = await axiosRequestWithAuth(token).post(url_courses, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return request;
};

const CreateModuleRequest = async (data: any, token: string) => {
  const request = await axiosRequestWithAuth(token).post(url_modules, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const UpdateCourseRequest = async (
  data: any,
  token: string,
  courseID: string
) => {
  const request = await axiosRequestWithAuth(token).patch(
    `${url_courses}${courseID}/`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return request;
};

const UpdateModuleRequest = async (
  data: any,
  moduleID: string,
  accessToken: string
) => {
  const request = await axiosRequestWithAuth(accessToken).patch(
    `${url_modules}${moduleID}/`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return request;
};

const DeleteModule = async (moduleID: string, accessToken: string) => {
  const request = await axiosRequestWithAuth(accessToken).delete(
    `${url_modules}${moduleID}/`
  );
  return request;

}

const DeleteLesson = async (lessonID: string, accessToken: string) => {
  const request = await axiosRequestWithAuth(accessToken).delete(
    `${url_lessons}${lessonID}/`
  )

  return request;
}

export {
  axiosRequest,
  LoginRequest,
  RegisterRequest,
  VerifyRequest,
  RefreshTokenRequest,
  GetUserRequest,
  GetCoursesRequest,
  GetCourseRequest,
  GetModulesRequest,
  GetLessonsRequest,
  GetModuleRequest,
  GetLessonsOfModuleRequest,
  DeleteCourse,
  CreateCourseRequest,
  UpdateCourseRequest,
  CreateModuleRequest,
  CreateLessonRequest,
  UpdateModuleRequest,
  DeleteModule,
  DeleteLesson
};
