import styled from "styled-components"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px;
`;

export default function IconWrapper({Icon, text, variant = "32x32_4", onClick = null, backgroundColor = null}) {
    return (
        <Container onClick={onClick}>
            <Icon variant={variant} className="pointer" />
            <p style={{backgroundColor: backgroundColor ?? 'transparent', padding: '3px'}}>{text}</p>
        </Container>
    )
}