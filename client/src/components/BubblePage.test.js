import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import BubblePage from "./BubblePage";
import ColorList from './ColorList'
import { fetchColors as mockFetchColors } from '../api/fetchColors'

jest.mock('../api/fetchColors')

const res = {
  data : [
  {
    color: "aliceblue",
    code: {
      hex: "#f0f8ff"
    },
    id: 1
  },
]
}

const colorsData = [
  {
    color: "aliceblue",
    code: {
      hex: "#f0f8ff"
    },
    id: 1
  }
]


test("Fetches data and renders the bubbles", async () => {
  // Finish this test
    mockFetchColors.mockResolvedValue(res)
     render(<BubblePage/>)
    
    screen.debug()
    const color = await waitFor(() => screen.getByText(/aliceblue/i))
    expect(color).toBeInTheDocument() 
});

test('ColorList renders to page and displays data', () => {
  const { rerender } = render(<ColorList colors={[]} />)

  let colorsArr = screen.queryAllByTestId(/colorName/i)
  expect(colorsArr).toHaveLength(0)

  rerender(<ColorList colors={colorsData} />)
  colorsArr = screen.queryAllByTestId(/colorName/i)
  expect(colorsArr).toHaveLength(0)
})