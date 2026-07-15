import { useParams } from 'react-router-dom';
import ProjectDetailsCard from '../../components/admin_dashboard/ProjectDetailsCard';

const ProjectDetailsPage = () => {
  const { id } = useParams();

  return <ProjectDetailsCard id={id} />;
};

export default ProjectDetailsPage;
