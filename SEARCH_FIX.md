# תיקון בעיות חיפוש וטעינת משימות

## הבעיה
- משימות לא נטענו בעת טעינת האפליקציה
- חיפוש ריק לא הציג את כל המשימות
- רענון הדף לא טען משימות

## הפתרון

### 1. Frontend (useTasks.ts)
עדכנתי את הלוגיקה של שליחת פרמטר החיפוש:
```typescript
const params: any = {};
if (searchQuery && searchQuery.trim() !== '') {
  params.search = searchQuery;
}
```

**מה זה עושה:**
- אם שדה החיפוש ריק או מכיל רק רווחים - לא שולח פרמטר `search`
- אם יש טקסט בחיפוש - שולח את הפרמטר לשרת
- כך השרת מחזיר את כל המשימות כשאין חיפוש

### 2. Backend (main.py)
עדכנתי את endpoint של קבלת המשימות:
```python
def read_tasks(skip: int = 0, limit: int = 100, search: Optional[str] = None, ...):
    query = db.query(models.Task).filter(models.Task.owner_id == current_user.id)
    
    if search and search.strip():
        # רק אם יש טקסט חיפוש - מפעיל פילטר
        search_filter = f"%{search}%"
        query = query.filter(...)
    
    tasks = query.offset(skip).limit(limit).all()
    return tasks
```

**מה זה עושה:**
- `search: Optional[str] = None` - הפרמטר אופציונלי
- `if search and search.strip():` - בודק שיש טקסט ממשי
- אם אין חיפוש - מחזיר את כל המשימות של המשתמש

## תוצאה
✅ טעינת האפליקציה - טוען את כל המשימות  
✅ רענון הדף - טוען את כל המשימות  
✅ שדה חיפוש ריק - מציג את כל המשימות  
✅ הקלדת טקסט - מסנן משימות בזמן אמת  
✅ מחיקת טקסט החיפוש - חוזר להציג את כל המשימות  

## איך לבדוק
1. רענן את הדפדפן
2. אמור לראות את כל המשימות שלך
3. הקלד משהו בחיפוש - המשימות מסתננות
4. מחק את הטקסט - כל המשימות חוזרות
