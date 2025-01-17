import React from 'react'
import PropTypes from 'prop-types'
import ContentWrapper from '../ContentWrapper'
import styled from 'styled-components'
import { contentfulModuleToComponent } from '../../lib/utils/moduleToComponent'
import classnames from 'classnames'
import { SectionTitle, Section } from '../StyledGeneral'

const ContentfulModuleContainer = props => {
  const {
    moduleConfig: {
      headline,
      description,
      backgroundColor,
      paddingTop,
      displayHeadline,
      headlineAlignCenter,
      contentAlignCenter,
      noPaddingBottom,
      modules,
      sectionPadding,
      modulesMargin,
      previewMode,
    },
  } = props

  const { childMarkdownRemark: { html } = {} } = description || {}
  const htmlData = previewMode ? description : html;
  return (
    <Container
      sectionPadding={sectionPadding}
      className={classnames({
        noPaddingBottom: noPaddingBottom,
        [`bg-${backgroundColor}`]: backgroundColor,
      })}
    >
      <ContentWrapper>
        {(headline && displayHeadline) || htmlData ? (
          <ContentInfo paddingTop={paddingTop}>
            {headline && displayHeadline ? (
              <Title
                className={classnames({
                  'txt-center': headlineAlignCenter,
                })}
              >
                {headline}
              </Title>
            ) : null}
            {htmlData ? (
              <SubInfo
                className={classnames({
                  'txt-center': contentAlignCenter,
                })}
                dangerouslySetInnerHTML={{ __html: htmlData }}
              />
            ) : null}
          </ContentInfo>
        ) : null}
        {modules && modules.length ? (
          <Modules
            contentAlignCenter={contentAlignCenter}
            modulesMargin={modulesMargin}
          >
            {modules.map(m =>
              contentfulModuleToComponent({
                ...m,
                previewMode,
                hasModuleContainer: true,
                containerBgColor: backgroundColor,
                color: ['dark'].includes(backgroundColor) ? 'white' : 'black',
              })
            )}
          </Modules>
        ) : null}
      </ContentWrapper>
    </Container>
  )
}

export default ContentfulModuleContainer

ContentfulModuleContainer.propTypes = {
  moduleConfig: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]),
    paddingTop: PropTypes.string,
    backgroundColor: PropTypes.string,
    headlineAlignCenter: PropTypes.bool,
    contentAlignCenter: PropTypes.bool,
    displayHeadline: PropTypes.bool,
    noPaddingBottom: PropTypes.bool,
  }),
}

const Container = styled(Section)``

const Title = styled(SectionTitle)`
  padding-bottom: 20px;
`
const Modules = styled.div`
  display: block;
  ${({ contentAlignCenter }) =>
    contentAlignCenter
      ? `
    display: flex;
    flex-direction: column;
    align-items: center;
  `
      : ``}

  > * {
    &:not(:last-child) {
      margin-bottom: ${({ modulesMargin }) => modulesMargin || '40px'};
    }
  }

  > .ctaModuleContainer {
    padding: 22px;
    margin-bottom: 0;
  }
  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    .button {
      width: 100%;
    }
  }
`
const ContentInfo = styled.div`
  margin-bottom: 1rem;
  ${({ paddingTop }) =>
    paddingTop
      ? `
    padding-top: ${paddingTop};
  `
      : ''}
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    padding-top: 0;
  }
`
const SubInfo = styled.div`
  display: block;
`
