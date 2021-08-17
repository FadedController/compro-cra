export type user = {
  email: string;
  departments: string[];
  permissions: permissions;
  uid: string;
  photoUrl: string | null;
  lastLogin: number;
  displayName: string | null;
} | null;

export type permissions = "admin" | "user" | null;
