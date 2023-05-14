import Login from "./Login";
import { customRender } from "../../utils/jest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockerUser = {
  email: "user@gmail.com",
  password: "123456",
};

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("axios", () => ({
  ...(jest.requireActual("axios") as any),
  post: (url: string, data: { email: string, password: string }) => {
    if (data.email === 'user@gmail.com' && data.password === '123456') {
      return Promise.resolve({ data: mockerUser })
    } else {
      return Promise.reject({ error: 'wrong credential' });
    }
  },
}));

jest.spyOn(window, 'alert').mockImplementation(() => {});

describe("E2E - Login", () => {
  // let view: any = null;
  const setUserState = jest.fn();
  let emailInput: any = null;
  let passwordInput: any = null;
  let emailRequiredError: any = null;
  let passwordRequiredError: any = null;
  let submitBtn: any = null;

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    customRender(<Login setUserState={setUserState} />);
    emailInput = screen.getByRole("textbox");
    passwordInput = screen.getByPlaceholderText(/password/i, { exact: false });
    emailRequiredError = screen.queryByText(/email is required/i, {
      exact: false,
    });
    passwordRequiredError = screen.queryByText(/password is required/i, {
      exact: false,
    });
    submitBtn = screen.getByRole("button", {
      name: /login/i,
    });
  });

  it("Login form render correctly", () => {
    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(emailRequiredError).not.toBeInTheDocument();
    expect(passwordRequiredError).not.toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  it("Login show correspond error", () => {
    userEvent.click(submitBtn);
    emailRequiredError = screen.queryByText(/email is required/i, {
      exact: false,
    });
    passwordRequiredError = screen.queryByText(/password is required/i, {
      exact: false,
    });

    expect(emailRequiredError).toBeInTheDocument();
    expect(passwordRequiredError).toBeInTheDocument();
  });

  it("Should login successfully and trigger data to parent component!", async () => {
    userEvent.type(emailInput, mockerUser.email);
    userEvent.type(passwordInput, mockerUser.password);
    userEvent.click(submitBtn);

    emailRequiredError = screen.queryByText(/email is required/i, {
      exact: false,
    });
    passwordRequiredError = screen.queryByText(/password is required/i, {
      exact: false,
    });

    expect(emailRequiredError).not.toBeInTheDocument();
    expect(passwordRequiredError).not.toBeInTheDocument();

    await waitFor(() => {
      expect(setUserState).toBeCalledWith(mockerUser);
    });

    await waitFor(() => {
      expect(mockedUsedNavigate).toBeCalledWith("/");
    });
  });

  it("Should alert error", async () => {
    userEvent.type(emailInput, "1213@gmail.com");
    userEvent.type(passwordInput, "###");
    userEvent.click(submitBtn);

    emailRequiredError = screen.queryByText(/email is required/i, {
      exact: false,
    });
    passwordRequiredError = screen.queryByText(/password is required/i, {
      exact: false,
    });

    expect(emailRequiredError).not.toBeInTheDocument();
    expect(passwordRequiredError).not.toBeInTheDocument();

    await waitFor(() => {
      expect(setUserState).not.toBeCalled();
    });

    await waitFor(() => {
      expect(mockedUsedNavigate).not.toBeCalled();
    });

    await waitFor(() => {
      expect(window.alert).toBeCalledWith('wrong credential');
    });
  });
});
