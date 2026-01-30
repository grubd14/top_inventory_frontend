import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const RegisterForm = () => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Register your account</CardTitle>
        <CardDescription>
          Enter a username and password below along with role
        </CardDescription>
        <CardAction>
          <Button variant="link">Login</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Email</Label>
              <Input
                id="username"
                type="text"
                placeholder="angryBird234@"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
        <RadioGroup defaultValue="user" className="w-fit flex gap-4 pt-4">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="user" id="user" />
            <Label htmlFor="user">User</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="admin" id="admin" />
            <Label htmlFor="admin">Admin</Label>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Register
        </Button>
      </CardFooter>
    </Card>
  );
};

// export const RegisterForm = () => {
//   return (
//     <div>
//       <form>
//         {/*username */}
//         <div className="flex flex-col gap-4">
//           <label className="text-[16px] font-semibold" htmlFor="username">
//             Username
//           </label>
//           <input
//             className="border px-2 border-red-500 rounded-md focus:outline-red-700"
//             type="text"
//             placeholder="AngryBird"
//             id="username"
//           ></input>
//         </div>
//         {/*password */}
//         <div className="flex flex-col gap-4">
//           <label className="text-[16px] font-semibold" htmlFor="password">
//             Password
//           </label>
//           <input
//             className="border px-2 border-red-500 rounded-md focus:outlineoutline-red-700"
//             type="password"
//             id="password"
//             placeholder="Enter password"
//           ></input>
//         </div>
//         {/*database role */}
//         <fieldset className="border">
//           <legend>Select a database role: </legend>
//           <div className="flex justify-center gap-6">
//             <div>
//               <label htmlFor="admin" className="">
//                 Admin
//               </label>
//               <input
//                 type="radio"
//                 id="admin"
//                 name="role"
//                 value="admin"
//                 className=""
//               ></input>
//             </div>
//             <div>
//               <label htmlFor="user">User</label>
//               <input type="radio" id="user" name="role" value="user"></input>
//             </div>
//           </div>
//         </fieldset>
//       </form>
//     </div>
//   );
// };
