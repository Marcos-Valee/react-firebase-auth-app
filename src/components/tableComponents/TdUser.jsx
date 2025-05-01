function TdUser({ name }) {
    return (
      <td className="border">
        <div className="flex justify-center items-center p-3">{name}</div>
      </td>
    );
  }
  
  export default TdUser;
  