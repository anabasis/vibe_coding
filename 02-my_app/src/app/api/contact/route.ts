import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "이름과 이메일을 모두 입력해주세요." },
        { status: 400 }
      );
    }

    const notionApiKey = process.env.NOTION_KEY;
    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!notionApiKey || !databaseId) {
      return NextResponse.json(
        { error: "서버 설정 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    const response = await fetch(`https://api.notion.com/v1/pages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${notionApiKey}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: {
          database_id: databaseId,
        },
        properties: {
          이름: {
            title: [
              {
                text: {
                  content: name,
                },
              },
            ],
          },
          이메일: {
            email: email,
          },
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Notion API error:", errorData);
      return NextResponse.json(
        { error: "데이터 저장 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
