--取得第一頁的資料
SELECT
    *
FROM
    `address_book`
ORDER BY
    sid DESC
limit
    0, 20;

--取得用戶7號的喜愛項目
SELECT
    *
FROM
    `ab_like`
WHERE
    `member_sid` = 7;

--取得第一頁的資料，裡面要包含喜愛項目的資料(error way:只拿到有加入喜愛清單的)
SELECT
    *
FROM
    address_book ab
    LEFT JOIN ab_like li ON ab.sid = li.ab_sid
WHERE
    li.member_sid = 7
ORDER BY
    ab.sid DESC
LIMIT
    0, 20;

--取得第一頁的資料，裡面要包含喜愛項目的資料
SELECT
    ab.*,
    li.sid like_sid
FROM
    address_book ab
    LEFT JOIN (
        SELECT
            *
        FROM
            ab_like
        WHERE
            member_sid = 7
    ) li ON ab.sid = li.ab_sid
ORDER BY
    ab.sid DESC
LIMIT
    0, 20;

--不同用戶
SELECT
    ab.*,
    li.sid like_sid
FROM
    address_book ab
    LEFT JOIN (
        SELECT
            *
        FROM
            ab_likes
        WHERE
            member_sid = 3
    ) li ON ab.sid = li.ab_sid
ORDER BY
    ab.sid DESC
LIMIT
    0, 20;