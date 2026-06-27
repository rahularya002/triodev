import type { ClientUser } from "../types"

export const clientUsers: ClientUser[] = [
  { id: "u1", name: "Rahul Client", email: "rahul@acmecorp.com", role: "Admin", avatar: "https://github.com/shadcn.png" },
  { id: "u2", name: "Jane Manager", email: "jane@acmecorp.com", role: "Manager" },
  { id: "u3", name: "Bob Viewer", email: "bob@acmecorp.com", role: "Viewer" },
]
