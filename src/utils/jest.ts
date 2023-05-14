import { RenderOptions, render } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";

export const customRender = (com: any, options?: RenderOptions) => {
  return render(com as any, { wrapper: Router, ...options })
}