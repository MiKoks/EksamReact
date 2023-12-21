import { MouseEvent } from "react";
import { ILoginData } from "../../dto/ILoginData";
import './login.css';

interface IProps {
    values: ILoginData;

    validationErrors: string[];

    handleChange: (target: EventTarget & HTMLInputElement) => void;

    onSubmit: (event: MouseEvent) => void;

    changePassswordVisability: () => void;

}

const LoginFormView = (props: IProps) => {
    return (
        <form className="form-signin w-100 m-auto">
            <h2>Login</h2>
            <hr />

            <ul style={{ 'display': props.validationErrors.length == 0 ? 'none' : '' }}>
                <li>{props.validationErrors.length > 0 ? props.validationErrors[0] : ''}</li>
            </ul>

            <div className="form-floating mb-3">
                <input
                    onChange={(e) => props.handleChange(e.target)}
                    value={props.values.email}
                    className="form-control" autoComplete="username" aria-required="true" placeholder="name@example.com" type="email"
                    id="Input_Email" name="email" />
                <label htmlFor="Input_Email">Email</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    onChange={(e) => props.handleChange(e.target)}
                    value={props.values.password}
                    className="form-control" autoComplete="new-password" aria-required="true" placeholder="password"
                    type={props.values.passwordVisible ? "text" : "password"}
                    id="Input_Password" maxLength={100} name="password" />
                <label htmlFor="Input_Password">Password</label>
            </div>
            <div>
                <input type="checkbox" className="mt-1 visability" id="password_visability" onChange={props.changePassswordVisability}/>
                <label htmlFor="password_visability">Hide password</label>
                
            </div>
            <button
                onClick={(e) => props.onSubmit(e)}
                id="registerSubmit" className="w-100 btn btn-lg btn-primary">Login</button>
            

        </form>
    );
}

export default LoginFormView;
