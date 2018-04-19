import {styled} from "@barlus/nerv/styled/styled"



const Header = styled.h2`
  color: #${props => props.status === 'success' ? '000' : 'F00'};
`;

const MyButton = styled.button`
  padding: 10px;
  border-radius: ${0}px;
  background: #F1F1F1;
  &:hover ${Header} {
    background: #555;
  }
`;

const Wrapper = styled.div`
  width: 500px;
  border: 1px solid #aaa;

  @media (min-width: 400px) {
    width: 100%;
    background: #F1F1F1;
  }
`;


document.body.appendChild(Wrapper(
    Header({status:'failed'},'My header!'),
    MyButton({ onclick: () => console.log('yay!') },
        'Do Something',
        'Say Something Else'
    )
));
document.body.appendChild(Header({ status: 'success' },
    'My Header'
));