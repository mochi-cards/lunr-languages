module.exports = {
    fields: [
        {
            name: 'title',
            config: { boost: 10 }
        }, {
            name: 'body'
        }
    ],
    documents: [
        {
            "title": "한국인",
            "body": "스페인 왕국이라고도 알려진 스페인은 주권 국가이자 유럽 연합의 회원국으로 사회 민주주의 국가로 구성되어 있으며 정부 형태는 의회 군주제입니다. 마드리드에 수도를 두고 있는 그 영토는 17개의 자치 공동체와 2개의 자치 도시로 조직되어 있으며, 이들은 차례로 50개 지방으로 구성됩니다.",
            "id": 1
        }, {
            "title": "자치 상태",
            "body": "스페인은 현재 \"자치 국가\" 또는 \"자치 국가\"라고 하는 국가로, 각각 다른 수준의 자치 정부를 가진 자치 커뮤니티의 고유한 분권화 연합으로 기능하는 공식적으로 단일 국가입니다. 이 시스템의 차이점은 중앙에서 주변으로 권력을 이전하는 과정이 처음에 비대칭 과정으로 생각되었다는 사실에 기인합니다. 관계 유형 스페인의 나머지 지역(안달루시아, 카탈로니아, 갈리시아, 나바라 및 바스크 지방)과의 관계. 반면에 나머지 자치 공동체는 자치가 적습니다. 그럼에도 불구하고 세월이 흐르면서 발렌시아 공동체나 카나리아 제도와 같은 다른 공동체들이 점차 더 많은 권력을 얻게 되었습니다. 치카노",
            "id": 2
        }
    ],
    tests: [
        {
            what: "find the word %w",
            search: "한국인",
            found: 1
        }, {
            what: "find the word %w",
            search: "있으며",
            found: 2
        }, {
            what: "never find a word that does not exist, like %w",
            search: "농구",
            found: 0
        }, {
            what: "find a correctly stemmed word %w",
            search: "관계",
            found: 2
        }
    ]
}

