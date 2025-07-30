import withAuth from "./withAuth";



type NavbarProps = {
    userId: string;
    username: string
  };
  

function Navbar({userId, username}: NavbarProps){


    return (
        <div className="bg-dark-olive text-white px-4 py-3 flex justify-between items-center">
        Welcome {username}
        </div>
    )
}
export default withAuth(Navbar)