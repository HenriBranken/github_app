import renderer from "react-test-renderer";
import CommitCard from "../components/UI/CommitCard/CommitCard";

test("Render Commit Card", () => {
  const theURL = "https://api.github.com/repos/sonya/fhir/commits";
  const tree = renderer.create(<CommitCard url={theURL} />).toJSON();
  expect(tree).toMatchSnapshot();
});
