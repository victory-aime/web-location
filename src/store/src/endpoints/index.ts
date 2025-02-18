type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type APIObjectType = {
  url: string;
  method: MethodType;
  responseType?: string;
};
export const API_BASIC_URL = {
  SECURED_API: '/secure',
  UNSECURED_API: '/unsecured',
};
type PathBaseKeys = keyof typeof API_BASIC_URL;
export enum PlatformType {
  WEB = 'WEB',
}
const API_BASIC_URL_MAP: Record<PlatformType, typeof API_BASIC_URL> = {
  [PlatformType.WEB]: API_BASIC_URL,
};
type ApiActionProps = {
  pathBase?: PathBaseKeys;
  path: string;
  method: MethodType;
  platformType?: PlatformType;
  baseUrl?: string;
  responseType?: string;
};

const createApiAction = ({
  pathBase = 'SECURED_API',
  method,
  path,
  platformType = PlatformType.WEB,
  baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL + '/_api',
  responseType,
}: ApiActionProps): APIObjectType => {
  const url = baseUrl?.concat(
    ...[API_BASIC_URL_MAP[platformType][pathBase], path],
  );
  return {
    url,
    method,
    responseType,
  };
};

const APIS = (
  platformType: PlatformType = PlatformType.WEB,
  baseUrl?: string,
) => {
  return {
    SEND_EMAIL: {
      CONTACT_US: createApiAction({
        pathBase: 'UNSECURED_API',
        path: '/send-email',
        method: 'POST',
        baseUrl,
      }),
    },
    AUTH: {
      SIGN_IN: createApiAction({
        pathBase: 'UNSECURED_API',
        path: '/auth/login',
        method: 'POST',
        baseUrl,
      }),
      SIGN_UP: createApiAction({
        pathBase: 'UNSECURED_API',
        path: '/auth/sign-up',
        method: 'POST',
        baseUrl,
      }),
      SEND_OTP: createApiAction({
        pathBase: 'UNSECURED_API',
        path: '/auth/send-otp',
        method: 'POST',
        baseUrl,
      }),
      VALIDATE_OTP: createApiAction({
        pathBase: 'UNSECURED_API',
        path: '/auth/validate-otp',
        method: 'POST',
        baseUrl,
      }),
      FORGOT_PASSWORD: createApiAction({
        pathBase: 'UNSECURED_API',
        path: '/auth/forgot-password',
        method: 'POST',
        baseUrl,
      }),
      UPDATE_PASSWORD: createApiAction({
        pathBase: 'UNSECURED_API',
        path: '/auth-updatePassword',
        method: 'POST',
        baseUrl,
      }),
      GET_TERMS_AND_CONDITIONS: createApiAction({
        pathBase: 'UNSECURED_API',
        platformType,
        path: 'legal-notice',
        method: 'GET',
        baseUrl,
      }),
      GET_SECURITY_MENTION: createApiAction({
        pathBase: 'UNSECURED_API',
        platformType,
        path: 'security-mention',
        method: 'GET',
        baseUrl,
      }),
    },
    PACKS: {
      ACTIVATE_DEACTIVATE_PACK: createApiAction({
        pathBase: 'SECURED_API',
        path: '/packs/activate-deactivate-pack',
        method: 'PUT',
        baseUrl,
      }),
      GET_ALL_PACKS: createApiAction({
        pathBase: 'SECURED_API',
        path: '/packs',
        method: 'GET',
        baseUrl,
      }),
      CREATE_PACK: createApiAction({
        pathBase: 'SECURED_API',
        path: '/packs/create-pack',
        method: 'POST',
        baseUrl,
      }),
      GET_ONE_PACK: createApiAction({
        pathBase: 'SECURED_API',
        path: '/packs/find-pack',
        method: 'POST',
        baseUrl,
      }),
      UPDATE_PACK: createApiAction({
        pathBase: 'SECURED_API',
        path: '/packs/update-pack',
        method: 'PUT',
        baseUrl,
      }),
      DELETE_PACK: createApiAction({
        pathBase: 'SECURED_API',
        path: '/packs/delete-pack',
        method: 'DELETE',
        baseUrl,
      }),
    },
    MODULE_MANAGEMENT: {
      FIND_ALL: createApiAction({
        pathBase: 'SECURED_API',
        path: '/modules',
        method: 'POST',
        baseUrl,
      }),
      FIND_ONE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/modules/find-module',
        method: 'POST',
        baseUrl,
      }),
      CREATE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/modules/create-module',
        method: 'POST',
        baseUrl,
      }),
      UPDATE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/modules/update-module',
        method: 'PUT',
        baseUrl,
      }),
      DELETE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/modules/delete-module',
        method: 'DELETE',
        baseUrl,
      }),
    },
    USERS_MANAGEMENT: {
      FIND_ALL: createApiAction({
        pathBase: 'SECURED_API',
        path: '/users',
        method: 'POST',
        baseUrl,
      }),
      FIND_ONE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/users/find-user',
        method: 'POST',
        baseUrl,
      }),
      CREATE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/users/create-user',
        method: 'POST',
        baseUrl,
      }),
      UPDATE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/users/update-user',
        method: 'PUT',
        baseUrl,
      }),
      DELETE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/users/delete-user',
        method: 'DELETE',
        baseUrl,
      }),
      GET_STATS: createApiAction({
        pathBase: 'SECURED_API',
        path: '/users/get-user-subscription-packs',
        method: 'GET',
        baseUrl,
      }),
      GET_ACTIVE_INACTIVE_COUNT: createApiAction({
        pathBase: 'SECURED_API',
        path: '/users/get-user-active-inactive-count',
        method: 'GET',
        baseUrl,
      }),
      SCHOOLS_STATS: createApiAction({
        pathBase: 'SECURED_API',
        path: '/school-management/schools-stats',
        method: 'GET',
        baseUrl,
      }),
    },

    //APIs for Client
    SCHOOL_MANAGEMENT: {
      GET_SCHOOL_STAFF_STATS: createApiAction({
        pathBase: 'SECURED_API',
        path: '/school-management/schools-stats-by-type',
        method: 'GET',
        baseUrl,
      }),
      GET_SCHOOL_PACK_MODULE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/school-management/get-school-pack-module',
        method: 'GET',
        baseUrl,
      }),
    },
    CLASS_MANAGEMENT: {
      FIND_ALL: createApiAction({
        pathBase: 'SECURED_API',
        path: '/class-management',
        method: 'POST',
        baseUrl,
      }),
      CREATE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/class-management/create-class',
        method: 'POST',
        baseUrl,
      }),
      UPDATE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/class-management/update-class',
        method: 'PUT',
        baseUrl,
      }),
      DELETE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/class-management/delete-class',
        method: 'DELETE',
        baseUrl,
      }),
    },
    MANAGE_STUDENT: {
      GET_ALL_STUDENTS: createApiAction({
        pathBase: 'SECURED_API',
        path: '/student-management',
        method: 'POST',
        baseUrl,
      }),
      CREATE_STUDENT: createApiAction({
        pathBase: 'SECURED_API',
        path: '/student-management/create-student',
        method: 'POST',
        baseUrl,
      }),
      UPDATE_STUDENT: createApiAction({
        pathBase: 'SECURED_API',
        path: '/student-management/update-student',
        method: 'PUT',
        baseUrl,
      }),
      DELETE_STUDENT: createApiAction({
        pathBase: 'SECURED_API',
        path: '/student-management/delete-student',
        method: 'DELETE',
        baseUrl,
      }),
      GET_TRANSACTION_LIST: createApiAction({
        pathBase: 'SECURED_API',
        path: '/tuition-payments/get-transaction',
        method: 'GET',
        baseUrl,
      }),
      CREATE_TRANSACTION: createApiAction({
        pathBase: 'SECURED_API',
        path: '/tuition-payments/create-transaction',
        method: 'POST',
        baseUrl,
      }),
      UPDATE_TRANSACTION: createApiAction({
        pathBase: 'SECURED_API',
        path: '/tuition-payments/update-transaction',
        method: 'PUT',
        baseUrl,
      }),
      DELETE_TRANSACTION: createApiAction({
        pathBase: 'SECURED_API',
        path: '/tuition-payments/delete-transaction',
        method: 'DELETE',
        baseUrl,
      }),
      GET_STUDENT_COUNT_BY_CYCLE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/student-management/student-count-by-cycle',
        method: 'GET',
        baseUrl,
      }),
    },
    MANAGE_ROLES: {
      GET_ALL_ROLES: createApiAction({
        pathBase: 'SECURED_API',
        path: '/roles',
        method: 'POST',
        baseUrl,
      }),
      CREATE_ROLE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/roles/create-role',
        method: 'POST',
        baseUrl,
      }),
      UPDATE_ROLE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/roles/update-role',
        method: 'PUT',
        baseUrl,
      }),
      DELETE_ROLE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/roles/delete-role',
        method: 'DELETE',
        baseUrl,
      }),
    },
    EMPLOYEE_MANAGEMENT: {
      // GET_EMPLOYEE_COUNT: createApiAction({
      //   pathBase: 'SECURED_API',
      //   path: '/employee-management/count-by-type',
      //   method: 'GET',
      //   baseUrl,
      // }),
      GET_ALL_EMPLOYEE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/employee-management/get-all-employee',
        method: 'GET',
        baseUrl,
      }),
      CREATE_EMPLOYEE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/employee-management/create-new-employee',
        method: 'POST',
        baseUrl,
      }),
      UPDATE_EMPLOYEE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/employee-management/update-employee',
        method: 'PUT',
        baseUrl,
      }),
      DELETE_EMPLOYEE: createApiAction({
        pathBase: 'SECURED_API',
        path: '/employee-management/delete-employee',
        method: 'DELETE',
        baseUrl,
      }),
    },
    ADMINISTRATION_MANAGEMENT: {
      GET_ALL_ADMINISTRATION: createApiAction({
        pathBase: 'SECURED_API',
        path: '/administration-management/get-all-administration',
        method: 'GET',
        baseUrl,
      }),
      CREATE_NEW_ADMINISTRATION: createApiAction({
        pathBase: 'SECURED_API',
        path: '/administration-management/create-new-administration',
        method: 'POST',
        baseUrl,
      }),
      UPDATE_ADMINISTRATION: createApiAction({
        pathBase: 'SECURED_API',
        path: '/administration-management/update-administration',
        method: 'PUT',
        baseUrl,
      }),
      DELETE_ADMINISTRATION: createApiAction({
        pathBase: 'SECURED_API',
        path: '/administration-management/delete-administration',
        method: 'DELETE',
        baseUrl,
      }),
    },
    COLLABORATOR: {
      GET_ALL_COLLABORATORS: createApiAction({
        pathBase: 'SECURED_API',
        path: '/collaborator-management/get-all-collaborator',
        method: 'GET',
        baseUrl,
      }),
      CREATE_COLLABORATOR: createApiAction({
        pathBase: 'SECURED_API',
        path: '/collaborator-management/create-collaborator',
        method: 'POST',
        baseUrl,
      }),
      UPDATE_COLLABORATOR: createApiAction({
        pathBase: 'SECURED_API',
        path: '/collaborator-management/update-collaborator',
        method: 'PUT',
        baseUrl,
      }),
      DELETE_COLLABORATOR: createApiAction({
        pathBase: 'SECURED_API',
        path: '/collaborator-management/delete-collaborator',
        method: 'DELETE',
        baseUrl,
      }),
    },
  };
};

export default APIS;
