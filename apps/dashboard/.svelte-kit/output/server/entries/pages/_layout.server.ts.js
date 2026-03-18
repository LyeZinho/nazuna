import "@sveltejs/kit";
const load = async ({ cookies, url }) => {
  const session = cookies.get("session");
  return {
    user: session ? { id: "user-123" } : null
  };
};
export {
  load
};
